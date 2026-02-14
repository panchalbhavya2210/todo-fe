"use client";

import { createContext, useContext } from "react";

type ThemeContextType = {
  accent: string;
  setAccent: (color: string) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeController = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not found");
  return ctx;
};
