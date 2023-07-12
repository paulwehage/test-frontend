import React, { useEffect } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductDetails from "../pages/product-details";
import DomainDetails from "../pages/domain-details";
import useAuthenticator from "../hooks/useAuthenticator";
import { useAuthorization } from "../context/authorization";
import PermissionDenied from "../pages/permission-denied";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoutes = () => {  
  const { userHasPermission, alreadyChecked } = useAuthorization();

  if (!alreadyChecked) {
    return (
      <Box width="100%" height="95vh" display="flex">
        <CircularProgress style={{ margin: "0 auto", alignSelf: "center" }} />
      </Box>  
    )
  }
  
  return userHasPermission ? <Outlet /> : <Navigate to="/error/permission-denied" replace />
}

export const router = createBrowserRouter([
  {    
    path: "/",
    element: <App />
  },
  {
    path: "/error/permission-denied",
    element: <PermissionDenied />
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/:product/:version",
        element: <ProductDetails />,
      },
      {
        path: "/project/:category/:project",
        element: <DomainDetails />,
      }
    ],    
  }  
]);
