import React from "react";
import { AppBar, Box, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{height: "70px"}}>
        <Toolbar>
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
                      alt="Logo"
                    />
                  </Link>
                </Stack>
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
                  {/* Secciones del Navbar */}
                  {[
                    { label: "PATIO DEL DEPORTISTA", path: "/patio-del-deportista" },
                    { label: "ENTREVISTAS", path: "/entrevistas" },
                    { label: "HISTORIAS DEL GEN DOMINANTE", path: "/historias-gen-dominante" },
                    { label: "¿Quienes somos?", path: "/about" },
                  ].map((section, index) => (
                    <Link
                      key={index}
                      to={section.path}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          color: "white",
                          transition: "0.3s",
                          "&:hover": {
                            color: "orange",
                          },
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        {section.label}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
