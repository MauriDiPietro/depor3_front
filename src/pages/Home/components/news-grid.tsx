import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";

export const NewsGrid = () => {
  const news = useGlobalStore((state) => state.news);

  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Grid container spacing={3}>
        {news &&
          news.map((noticia: New, index: any) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={noticia.image}
                  alt={noticia.title || "No Image"}
                />
                <CardContent>
                  <Box
                    sx={{
                      backgroundColor: "orange",
                      color: "white",
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {noticia.category}
                  </Box>
                  <Typography variant="h5" component="div" gutterBottom>
                    {noticia.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

