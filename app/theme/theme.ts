"use client";
import { createTheme } from "@mui/material/styles";

export const getTheme = (accent: string, mode: "light" | "dark" = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: accent,
      },
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
    },
  });
