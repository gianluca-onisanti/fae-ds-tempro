// src/app/components/ThemeContext.tsx
"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { useSwitcher } from "../styles/Styler";

// 1. Definição dos Temas
const lightTheme = createTheme(useSwitcher("light") as any);
const darkTheme = createTheme(useSwitcher("dark") as any);

// 2. Provedor de Contexto
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    setIsDarkMode(storedTheme === "true");
    setIsDarkMode(storedTheme === "true");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook personalizado para fácil acesso
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }
  return context;
};
