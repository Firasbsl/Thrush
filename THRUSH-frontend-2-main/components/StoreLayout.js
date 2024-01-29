import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { createTheme } from "@material-ui/core";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import {BaseLayout} from "./common/layout";

export default function StoreLayout({ children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#db550d",
      },
      secondary: {
        main: "#db550f",
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseLayout/>
      </ThemeProvider>
    </div>
  );
}
