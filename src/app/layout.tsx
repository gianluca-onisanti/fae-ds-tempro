// src/app/layout.tsx (O *VERDADEIRO* layout raiz)
"use client";

import { AppThemeProvider } from "./components/ThemeContext"; // SEU provedor
import CssBaseline from "@mui/material/CssBaseline";
import "./styles/globals.css";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Header from "./components/Header";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>
          <CssBaseline />
          <Header />
          <Box>{children}</Box>
        </AppThemeProvider>
      </body>
    </html>
  );
}
