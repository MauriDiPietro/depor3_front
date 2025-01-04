import React, { useState } from "react";
import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sections = [
    { label: "PATIO DEL DEPORTISTA", path: "/patio-del-deportista" },
    { label: "ENTREVISTAS", path: "/entrevistas" },
    { label: "HISTORIAS DEL GEN DOMINANTE", path: "/historias-gen-dominante" },
    { label: "¿Quienes somos?", path: "/about" },
  ];

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              {/* Logotipo */}
              <Grid item>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dsooxiydo/image/upload/v1734522257/marca/gopsg4bkkopyinaxqu5k.png"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "200px",
                    }}
                    alt="Logo"
                  />
                </Link>
              </Grid>

              {/* Menú en pantallas grandes */}
              <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
                <Stack direction="row" spacing={2}>
                  {sections.map((section, index) => (
                    <Link key={index} to={section.path} style={{ textDecoration: "none" }}>
                      <Typography
                        variant="body1"
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

              {/* Menú hamburguesa en pantallas pequeñas */}
              <Grid item sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>

        {/* Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              {sections.map((section, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => toggleDrawer(false)}
                  component={Link}
                  to={section.path}
                >
                  <ListItemText primary={section.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
};
