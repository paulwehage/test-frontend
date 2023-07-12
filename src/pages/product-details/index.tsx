import React from "react";
import styles from "../../styles/Home.module.css";
import Header from "../../components/header";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,  
  SelectChangeEvent,
} from "@mui/material";
import Select from "../../components/select";
import { ProductDetailsService } from "../../services/product-details/product-details.service";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useCategories } from "../../context/categories";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { sanitizeProductVersion } from "../../services/product-details/utils";
import { Column, columnsBuilder } from "../../utils/columnsHelper";

type Row = { [key: string]: string | boolean };

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>
)

const ProductDetails = () => {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { categories, setCurrentCategory, currentCategory } = useCategories();

  const navigate = useNavigate();
  const { product, version } = useParams();  

  React.useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const productDetails = await ProductDetailsService.get();
      const versionSanitized = (product === "laravel" || product === 'nodejs') ? version!.split('.')[0] : sanitizeProductVersion(version!);
      const columnKeys = Object.keys(productDetails[product!][versionSanitized]);
      const buildedColumns = columnsBuilder(columnKeys)
      setColumns(buildedColumns)
      const buildRow = columnKeys.reduce((acc, key) => ({ ...acc, [key]: productDetails[product!][versionSanitized][key] }), {});
      const row = {
        id: version as string,
        product: product as string,
        ...buildRow,
      };
      setRows([row]);
      setLoading(false);
    };
    fetchProductDetails();
  }, [product, version]);

  const handleCategoryChange = async (event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value)
    navigate("/");
  };

  return (
    <main className={styles.main}>
      <Header />
      <Box
        width="95vw"
        height="50vh"
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
            sx={{height: '3.5rem', width: '3.5rem'}}
            style={{ marginRight: "2rem" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosRoundedIcon fontSize="inherit" />
          </IconButton>
            <FormControl style={{ width: "200px", marginBottom: 20 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              options={categories}
              label={"Categories"}
              handleChange={handleCategoryChange}
              value={currentCategory}
              loading={false}
            />
          </FormControl>
        </Box>
        <DataGrid columns={columns} rows={rows} loading={loading} slots={{ toolbar: CustomToolbar }} hideFooterPagination  />
      </Box>
    </main>
  );
};

export default ProductDetails;
