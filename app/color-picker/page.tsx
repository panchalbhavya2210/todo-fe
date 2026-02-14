"use client";

import { Box, Typography } from "@mui/material";
import { useThemeController } from "../providers/ThemeContext";
export default function AccentColorPicker() {
  const { accent, setAccent } = useThemeController();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccent(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography>Accent Color:</Typography>

      <input
        type="color"
        value={accent}
        onChange={handleChange}
        style={{
          width: 50,
          height: 35,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      />
    </Box>
  );
}
