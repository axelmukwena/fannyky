import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App";
import theme from "./theme";
import * as serviceWorker from "./others/serviceWorker";
import reportWebVitals from "./others/reportWebVitals";
import store from "./utils/store";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
