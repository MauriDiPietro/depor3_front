import React from "react";
import { Container, Grid } from "@mui/material";
import { HistoriasGrid } from "./components/historias-grid";

export const Historias: React.FC<{}> = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={1} sx={{ mt: 7 }}>
          <Grid item xs={12} md={12}>
            <HistoriasGrid />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
