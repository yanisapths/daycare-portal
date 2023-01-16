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
      main: "#FFECA7",
      lighter: '#FFFFCA',
      light: "#FBB7C7",
      dark: '#CAB769',
      darker: "#ECE656",
    },
    secondary: {
      main: "#AD8259",
      light: "#E0B186",
      darker: "#7C552F",
      variant: "#ffe898"
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    background: {
      main: "#fdfff5",
      secondary: "#AD8259",
      dark: "#6C5137",
    },
    gray: {
      main: "#f0f1f2"
    }
  },
  typography: {
    fontFamily: ['IBM Plex Sans Thai','sans-serif'].join(','), 
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "IBM Plex Sans Thai",
            fontDisplay: "swap",
          },
        ],
      },
    },
  },
});

export default theme;
