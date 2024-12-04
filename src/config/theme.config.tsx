import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

enum themePalette {
    BG = "#12181b",
    PURPLE = "#00F0FF",
    FONT_GLOBAL = "Montserrat"
}

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.PURPLE
        }
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none"
                }
            }
        }
    }
})

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}