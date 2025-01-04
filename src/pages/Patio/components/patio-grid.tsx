import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CalendarToday } from "@mui/icons-material";

export const PatioGrid = () => {
  const news = useGlobalStore((state) => state.news);
  const getAllNews = useGlobalStore((state) => state.getAllNews);
  const loadingNews = useGlobalStore((state) => state.loadingNews);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNews();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  if (loadingNews) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <p>Cargando...</p>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2 }} maxWidth="xl">
      <Grid container spacing={2}>
        {news &&
          news
            .filter(
              (noticia: New) =>
                noticia.active && noticia.category == "Patio del deportista"
            )
            .sort((a: New, b: New) => {
              // Convertir "dd/mm/aaaa" a Date para ordenar
              const dateA = new Date(a.date.split("/").reverse().join("/"));
              const dateB = new Date(b.date.split("/").reverse().join("/"));
              return dateB.getTime() - dateA.getTime(); // Orden descendente
            })
            .map((noticia: New, index: any) => (
              <>
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    onClick={() => handleCardClick(noticia._id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        noticia.image ||
                        noticia.multimedia[0] ||
                        "https://res.cloudinary.com/dsooxiydo/image/upload/v1735216082/sgbynryaedq7k6mo5tug.jpg"
                      }
                      alt={noticia.title || "Imagen de la noticia"}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        {noticia.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ))}
      </Grid>
    </Container>
  );
};
