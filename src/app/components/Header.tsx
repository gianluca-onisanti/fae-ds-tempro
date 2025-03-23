import { AppBar, Box, Toolbar, useTheme } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useStyles } from "../styles/Styler";
import Image from "next/image";
export default function Header() {
  const theme = useTheme();
  const sx = useStyles();

  return (
    <AppBar sx={sx.toolbar} position="static">
      <Toolbar>
        <Image
          priority
          src={`/images/tempro_${theme.palette.mode}.png`}
          alt="TemPro"
          width={112.75}
          height={31}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            width: "100%",
            marginLeft: "20px",
            justifyContent: "flex-end",
          }}
        >
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
