import { useTheme } from "@mui/material";

export function useSwitcher(mode: "light" | "dark") {
  const theme = {
    light: {
      palette: {
        mode: "light", // TEMA CLARO
        primary: {
          main: "#82c055",
        },
        secondary: {
          main: "#4c7132",
        },
        background: {
          default: "#ffffff",
          paper: "#e2f2d6",
        },
        text: {
          primary: "#212121",
          secondary: "#757575",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark", // TEMA ESCURO
        primary: {
          main: "#7bf225",
        },
        secondary: {
          main: "#429c01",
        },
        background: {
          default: "#474747",
          paper: "#424242",
        },
        text: {
          primary: "#ffffff",
          secondary: "#bdbdbd",
        },
      },
    },
  };

  return theme[mode];
}

export function useStyles() {
  const theme = useTheme();

  return {
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "325px",
      borderRadius: "10px",
      padding: "0 10px",
      margin: "10px 10px 10px 10px",
      backgroundColor: `${theme.palette.secondary.main}25`,
      color: theme.palette.text.primary,
    },
    button: {
      primary: {
        fontFamily: "font",
        width: 250,
        boxShadow: "4px 4px #00000050",
        border: 4,
        borderRadius: "10px",
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
        justifyContent: "space-around",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.main,
          borderColor: theme.palette.text.primary,
          transform: "scale(1.1)",
        },
      },
    },
  };
}
