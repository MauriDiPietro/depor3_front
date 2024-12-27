import React from "react";
import { AppBar, Box, Container, Grid, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {" "}
          {/* Aumenta la altura del navbar */}
          <Container maxWidth="xl">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" }, // Ajusta el comportamiento en pantallas pequeñas
              }}
            >
              {/* Logotipo */}
              <Grid item>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dsooxiydo/image/upload/v1734522257/marca/gopsg4bkkopyinaxqu5k.png"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "200px", // Ajustable para pantallas pequeñas
                      }}
                      alt=""
                    />
                  </Link>
                </Stack>
              </Grid>

              {/* GIF Publicitario */}
              <Grid item sx={{ ml: "auto", mt: "5px" }}>
                {" "}
                {/* Esto mueve el GIF a la derecha */}
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" }, // Oculta en pantallas pequeñas
                  }}
                >
                  <a href="https://www.cba.gov.ar/dengue/" target="_blank">
                    <img
                      src="https://res.cloudinary.com/dsooxiydo/image/upload/v1735297127/marca/yqz7uedh8fffraxqbjgl.gif"
                      alt=""
                      style={{
                        width: "720px",
                        height: "90px",
                      }}
                    />
                  </a>
                </Box>
              </Grid>

              {/* Botones */}
              <Grid item>
                <Stack
                  direction={{ xs: "column", sm: "row" }} // Columnas en pantallas pequeñas, filas en grandes
                  spacing={2}
                  sx={{
                    mt: { xs: 2, sm: 0 }, // Margen superior solo en pantallas pequeñas
                  }}
                >
                  {/* Aquí irían los botones */}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
