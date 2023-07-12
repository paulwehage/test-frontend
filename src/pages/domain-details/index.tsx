import React from "react";
import styles from "../../styles/Home.module.css";
import Header from "../../components/header";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Select from "../../components/select";
import { ProductDetailsService } from "../../services/product-details/product-details.service";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useCategories } from "../../context/categories";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { ProjectsInformationService } from "../../services/projects-information/projects-information.service";
import { sanitizeProductVersion } from "../../services/product-details/utils";
import { Column, columnsBuilder } from "../../utils/columnsHelper";

type Row = { [key: string]: string | boolean };

type Product = { 
  name:string;
  version?:string;
  cycle?: string;
};

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>
);

const DomainDetails = () => {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [products,setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { setCurrentCategory } = useCategories();

  const navigate = useNavigate();
  const { category, project } = useParams();

  React.useLayoutEffect(() => {
    const fetchProductDetails = async () => {      
      const projectDetails = await ProjectsInformationService.get(
        category as string,
        project as string
      );      
      setProducts(projectDetails.products)
    };
    fetchProductDetails();
  }, [category, project]);

  React.useEffect(()=>{
    if (rows.length < 1) {
      const buildRows = async () => {              
        const productDetails = await ProductDetailsService.get();
        const columnKeys = products.reduce((acc, product) => {
          const version = (product.cycle || product.version)!;
          const sanitizedVersion = (product.name === "laravel" || product.name === 'nodejs') ? version.split('.')[0] : sanitizeProductVersion(version);
          return [...new Set([...acc, ...Object.keys(productDetails[product.name][sanitizedVersion])])]
        }, [] as Array<string>);

        const buildedColumns = columnsBuilder(columnKeys);
        setColumns(buildedColumns);

        const rows = products.map(product => {
          const version = (product.cycle || product.version)!;
          const sanitizedVersion = (product.name === "laravel" || product.name === 'nodejs') ? version.split('.')[0] : sanitizeProductVersion(version);
          const buildRow = columnKeys.reduce((acc, key) => ({ ...acc, [key]: productDetails[product.name][sanitizedVersion][key] }), {});
          return ({
            id: (product.name + version),
            product: `${product.name.toLocaleUpperCase()} ${version}`,
            ...buildRow
          });
        }); 
        setRows(rows)
      }
      buildRows();
    }
  },[products])

  React.useEffect(() => {
    if (rows.length) setLoading(false);
  }, [rows])

  const handleCategoryChange = async (event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value);
    navigate("/");
  };

  return (
    <main className={styles.main}>
      <Header />
      <Box
        width="95vw"
        height="70vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={5}
        component="div"
        bgcolor="white"
        borderRadius="0.3rem"
        boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
      >
        <Box display="flex">
          <IconButton
            aria-label="back"
            size="medium"
            sx={{ height: "3.5rem", width: "3.5rem" }}
            style={{ marginRight: "2rem" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosRoundedIcon fontSize="inherit" />
          </IconButton>
          <Typography lineHeight="3.5rem">{project}</Typography>
        </Box>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          slots={{ toolbar: CustomToolbar }}
          hideFooterPagination
        />
      </Box>
    </main>
  );
};

export default DomainDetails;
