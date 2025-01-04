import React from "react";
import { Container, Grid } from "@mui/material";
import { PatioGrid } from "./components/patio-grid";

export const Patio: React.FC<{}> = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={1} sx={{ mt: 7 }}>
          <Grid item xs={12} md={12}>
            <PatioGrid />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
