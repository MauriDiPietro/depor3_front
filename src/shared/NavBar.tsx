import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link to="/">
                  <img src="/public/depor3-logo.png" width={250} height={80}></img>
                </Link>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Link to="/login">
                    <Button variant="contained">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="text">Registro</Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
