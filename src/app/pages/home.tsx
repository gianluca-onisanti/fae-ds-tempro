"use client";

import {
  Button,
  Container,
  useTheme,
  Grid2,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useStyles } from "../styles/Styler";
import { Cake, Timer } from "@mui/icons-material";
import { useState } from "react";

export default function HomePage() {
  const theme = useTheme();
  const sx = useStyles();

  return (
    <Container>
      <Grid2 mt={4} container spacing={{ xs: 1, md: 6 }} alignItems={"center"}>
        {/* Para estudo: 
          XS = ExtraSmall (Mobile); 
          MD = Medium (Telas P e Tablets); 
          LG = Large (PCs e TVs); 
        */}
        <Grid2
          sx={{ textAlign: { xs: "center", md: "start", lg: "start" } }}
          size={{ xs: 12, md: 6, lg: 6 }}
        >
          <Button variant="contained" sx={sx.button.primary}>
            <Typography>{"Iniciar Cronômetro"}</Typography>
            <Timer fontSize="large" />
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}
