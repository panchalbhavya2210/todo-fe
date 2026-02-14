"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { getTheme } from "../theme/theme";
import { ThemeContext } from "./ThemeContext";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // avoid Next.js hydration mismatch
  const [mounted, setMounted] = useState(false);

  const [accent, setAccent] = useState("#1976d2");
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Load saved theme (runs only on client)
  useEffect(() => {
    const savedAccent = localStorage.getItem("accent");
    const savedMode = localStorage.getItem("mode") as "light" | "dark" | null;

    if (savedAccent) setAccent(savedAccent);
    if (savedMode) setMode(savedMode);

    setMounted(true);
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem("accent", accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(accent, mode), [accent, mode]);

  // Prevent SSR hydration crash (very important in Next.js)
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ accent, setAccent, mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
