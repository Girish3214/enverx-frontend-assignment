import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>
);
