import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { RouterProvider } from "react-router-dom";
import store from "./store/store";
import { CategoriesProvider } from "./context/categories";
import "./styles/global.css";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import { AuthorizationProvider } from "./context/authorization";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <AuthorizationProvider>          
            <CategoriesProvider>
              <RouterProvider router={router} />
            </CategoriesProvider>
          </AuthorizationProvider>
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
