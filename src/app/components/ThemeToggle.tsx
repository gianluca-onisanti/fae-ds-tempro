// src/app/components/ThemeToggle.tsx
"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "./ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
