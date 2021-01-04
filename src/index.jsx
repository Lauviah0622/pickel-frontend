import React from "react";
import ReactDOM from "react-dom";
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import dayjs from "dayjs";
import rootReducer from "./redux/reducers";

import "./index.css";

import App from "./App.jsx";

const store = configureStore({reducer: rootReducer});

dayjs.locale("zh-tw");

const theme = {
  palette: {
    common: { black: "rgba(0, 0, 0, 0.93)", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "#D0E5B9",
      main: "#9ec767",
      dark: "rgba(98, 138, 56, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(180, 196, 204, 1)",
      main: "rgba(96, 125, 139, 1)",
      dark: "rgba(51, 75, 87, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#e64539",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
};

const muiTheme = createMuiTheme(theme);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MaterialThemeProvider theme={muiTheme}>
        <App />
      </MaterialThemeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
