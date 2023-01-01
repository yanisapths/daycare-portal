import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#FF2F3B",
    error: "#FF2F3B",
    success: "#4CAF50",
  },
  error: {
    main: "#4CAF50",
  },
  success: {
    main: "#4CAF50",
  },
  palette: {
    primary: {
      main: "#FFE898",
      lighter: '#FFFFCA',
      light: "#FBB7C7",
      dark: '#CAB769',
      darker: "#ECE656",
    },
    secondary: {
      main: "#AD8259",
      light: "#E0B186",
      darker: "#7C552F",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ['Mitr','sans-serif'].join(','), 
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "Mitr",
            fontDisplay: "swap",
          },
        ],
      },
    },
  },
});

export default theme;
