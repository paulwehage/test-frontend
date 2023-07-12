import React, { ChangeEvent } from "react";
import * as S from "./styles";
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DataGrid, GridRenderCellParams, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Select from "../../components/select";
import { ProjectsService } from "../../services/projects/projects.service";
import { useCategories } from "../../context/categories";
import { Projects } from "../../services/projects/projects.interface";
import { ProductDetailsService } from "../../services/product-details/product-details.service";
import { buildKey, checkProductsReleases, getCycle } from "./utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { sanitizeProductVersion } from "../../services/product-details/utils";

const PROJECT_COLUMN = { field: "projects", headerName: "Projects", width: 350, editable: false, renderCell: (params: GridRenderCellParams) => <S.BoxStyled>{params.value}</S.BoxStyled> };

type ColorRow = Record<string, "success" | "warning" | "error" | undefined>

type Column = { field: string, headerName: string, width: number, editable: boolean }

type Row = { [key: string]: string }

const Loading = () => (
  <Box width="100%" display="flex" style={{ position: 'absolute', top: "50%" }}>
      <CircularProgress style={{ margin: "0 auto" }} />
  </Box>   
)

const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />      
    </GridToolbarContainer>
)

const Dashboard: React.FC = () => {  
  const { categories, loading, setCurrentCategory, currentCategory } = useCategories();
  const [projectsByCategory, setProjectsByCategory] = React.useState<Record<string, Projects[]>>({});
  const [rows, setRows] = React.useState<Row[]>([]);  
  const [filteredRows, setFilteredRows] = React.useState<Row[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([])
  const [tableLoading, setTableLoading] = React.useState(false);  
  const [isFiltering, setIsFiltering] = React.useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();  

  const handleCategoryChange = async (event: SelectChangeEvent) => {
    const category = event.target.value;
    setCurrentCategory(category);    
  };

  const buildColorRows = React.useCallback(async (rows: Row[]) => {
    const productsDetails = await ProductDetailsService.get();
    return rows.flatMap(row => Object
      .entries(row)
      .filter(([key]) => key !== 'id' && key !== 'projects'))
      .reduce<ColorRow>((acc, [product, productVersion]) => {
        const version = getCycle(productVersion)!;
        const sanitizedVersion = (product === "laravel" || product === 'nodejs') ? version.split('.')[0] : sanitizeProductVersion(version);
        const productStatus = productsDetails[product] ? productsDetails[product][sanitizedVersion ?? ""] : undefined;     
        return ({
          ...acc,
          [productVersion]: checkProductsReleases({ productStatus, product })
        });
      }, {});
  }, [])

  const buildTableContent =  React.useCallback(async (category: string) => {        
    if (projectsByCategory[category]) return;
    setTableLoading(true);
    const projectsFromRequest = await ProjectsService.get(category);
    if (!projectsFromRequest) return;
    setProjectsByCategory(projectsFromRequest);

    const columns = projectsFromRequest[category]
      .flatMap(({ products }) => products)
      .map(({ name }) => name)

    const rows = projectsFromRequest[category]
      .map(({ products, domain }) => ({          
        ...(products.reduce((acc, { name, cycle }) => ({ ...acc, [name]: buildKey(name, cycle), id: `${cycle}${domain}${name}` }), { id: domain, projects: domain })),
    }))
      
    const getColorByProductVersion = await buildColorRows(rows);
    
    const filteredColumns = [...new Set(columns)]
      .map((name) => ({
        field: name,
        headerName: name.toUpperCase(),
        width: 150,
        editable: false,        
        renderCell: (params: GridRenderCellParams) => params.formattedValue ? (          
          <S.BoxStyled>
            <S.ChipStyled label={params.formattedValue} color={getColorByProductVersion[params.value]} />          
          </S.BoxStyled>
        ) : (<></>),
        valueFormatter: ({ value }: Record<string, string>) => getCycle(value)
    }))
  
    PROJECT_COLUMN.headerName = t('dashboard.header.projects');
    setColumns([PROJECT_COLUMN].concat(filteredColumns));      
    setRows(rows);
    setTableLoading(false);
  }, [projectsByCategory, buildColorRows])

  const onRowClick = (field: string, row: Record<string, string>) => {  
    if (!row[field]) return;

    if (field === "projects") {
      return navigate(`/project/${currentCategory}/${row[field]}`);  
    }

    return navigate(`/${field}/${getCycle(row[field])}`);
    
  }

  const onTextFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const { value } = event.target        
    if (!value && filteredRows.length) setFilteredRows([]);
    const filteredRowsArray = rows.filter(row => row.projects.includes(value));
    setFilteredRows(filteredRowsArray);
    setIsFiltering(!!value);
  }

  React.useEffect(() => {
    if (currentCategory === "") return;    
    buildTableContent(currentCategory);
  }, [currentCategory, buildTableContent])

  return (
    <S.Wrapper>
      {tableLoading && <Loading />}
      <S.Header>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">{t('dashboard.categories')}</InputLabel>
          <Select
            options={categories}
            label={t('dashboard.categories')}
            handleChange={handleCategoryChange}
            value={currentCategory}
            loading={loading}
          />
        </FormControl>
        <TextField
          style={{ marginLeft: "2rem", flex: 1 }}
          id="outlined-basic"
          label={t('dashboard.search')}
          variant="outlined"
          onChange={onTextFilterChange}
        />
      </S.Header>
      <S.WrapperTable>
        <DataGrid
          style={{ marginTop: "2rem" }}
          rows={isFiltering ? filteredRows : rows}
          columns={columns}
          initialState={{            
            pagination: { paginationModel: { pageSize: 50 } },
          }}
          pageSizeOptions={[50, 100]}
          onCellClick={({ field, row }) => onRowClick(field, row)}
          slots={{ toolbar: CustomToolbar }}
          pagination
        />
      </S.WrapperTable>      
    </S.Wrapper>
  );
};

export default Dashboard;
