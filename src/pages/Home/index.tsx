import React from "react";
import { Box, Container, Grid } from "@mui/material";

import { NewsGrid } from "./components/news-grid";

export const Home: React.FC<{}> = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={2} sx={{ mt: 7 }}>
          <Grid item xs={12} md={4}>
            <Box>
              <audio
                style={{ background: "orange" }}
                autoFocus
                controls
                autoPlay
                preload="none"
                src="https://server.laradio.online/proxy/rafael_gerlero?mp=/stream"
              >
                Your browser does not support the audio element.
              </audio>
              <p>Depor3 Radio FM 89.1 - Río Tercero</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <a
                href="https://www.cba.gov.ar/dengue/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
        </Grid>
        <NewsGrid />
      </Container>
    </>
  );
};
