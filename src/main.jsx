import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import App from "./App.jsx";
import "./index.css";
import theme from "./assets/css/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <App />
  </StyledEngineProvider>
);
