import * as React from "react";
import {  ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


export const ColorModeProvider=({children})=>{
      const [mode, setMode] = React.useState("light");
        const colorMode = React.useMemo(
          () => ({
            toggleColorMode: () => {
              setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
          }),
          []
        );
        const theme = React.useMemo(
          () =>
            createTheme({
              palette: {
                mode,
              },
            }),
          [mode]
        );
        React.useEffect(()=>{
          
        },[])

    return(
      <ColorModeContext.Provider value={colorMode} >
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
}

export const useColorMode=()=>React.useContext(ColorModeContext)