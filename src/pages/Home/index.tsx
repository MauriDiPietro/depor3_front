import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import { NewsGrid } from "./components/news-grid";
import { Helmet } from "react-helmet-async";
// import { HistoriasGrid } from "./components/historias-grid";

export const Home: React.FC<{}> = () => {
  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      <Helmet>
        <title>
          Depor3 Río Tercero | Web de la Capital Nacional del Deportista
        </title>
        <meta
          property="og:title"
          content={
            "Depor3 Río Tercero | Web de la Capital Nacional del Deportista"
          }
        />
      </Helmet>
      <Grid container spacing={1} sx={{ mt: 7 }}>
        <Grid item xs={12} md={4}>
          <Box>
            <audio
              style={{ background: "orange" }}
              autoFocus
              controls
              preload="none"
              src="https://server.laradio.online/proxy/rafael_gerlero?mp=/stream"
            >
              Your browser does not support the audio element.
            </audio>
            <p>Depor3 Radio FM 89.1 - Río Tercero</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          {/*
            <Box>
              <a
                href="https://youtu.be/h2J_ZdbxYVc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://res.cloudinary.com/dsooxiydo/image/upload/v1743853097/gob-cba-04-2025.gif"
                  alt="Publicidad"
                  style={{
                    width: "100%",
                    maxWidth: "700px",
                    height: "auto",
                  }}
                />
              </a>
            </Box>
          */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <NewsGrid />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider
            sx={{ borderColor: "divider" }}
            orientation="horizontal"
            flexItem
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "left",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Historias del Gen Dominante
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              ></Box>
            </Box>
          </CardContent>
          <HistoriasGrid />
        </Grid> */}
      </Grid>
    </Box>
  );
};
