import React from "react";
import { Container } from "@mui/material";

import { NewsGrid } from "./components/news-grid";
// import { NewsSlider } from "./components/news-slider";

export const Home: React.FC<{}> = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* <NewsSlider /> */}
        <NewsGrid />
      </Container>
    </>
  );
};
