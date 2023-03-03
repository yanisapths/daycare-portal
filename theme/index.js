import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#FF2F3B",
    error: "#FF2F3B",
    success: "#2ED477",
  },
  error: {
    main: "##FF2F3B",
  },
  success: {
    main: "#2ED477",
  },
  palette: {
    primary: {
      main: "#AD8259",
      light: "#E0B186",
      darker: "#7C552F",
      variant: "#ffe898",
      black:"##000000"
    },
    secondary: {
      main: "#FFECA7",
      lighter: "#FFFFCA",
      light: "#FBB7C7",
      dark: "#CAB769",
      darker: "#ECE656",
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
      main: "#f0f1f2",
    },
  },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "#AD8259" 
    }},
  textField: {
    background: "white",
    border: "2px solid",
    borderRadius: "10px",
    borderColor: "#AD8259",
  },
  typography: {
    fontFamily: ["IBM Plex Sans Thai", "sans-serif"].join(","),
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
  breakpoints: {
    values: {
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },
});

export default theme;
