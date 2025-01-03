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

export const NewsGrid = () => {
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
                noticia.active && noticia.category !== "Patio del deportista"
            )
            .sort((a: New, b: New) => {
              // Convertir "dd/mm/aaaa" a Date para ordenar
              const dateA = new Date(a.date.split("/").reverse().join("/"));
              const dateB = new Date(b.date.split("/").reverse().join("/"));
              return dateB.getTime() - dateA.getTime(); // Orden descendente
            })
            .map((noticia: New, index: any) => (
              <Grid
                item
                xs={12}
                sm={index === 0 ? 12 : 6} // La primera noticia ocupa todo el ancho en pantallas pequeñas
                md={index === 0 ? 12 : 4} // La primera noticia ocupa 8 columnas, el resto 4
                key={index}
              >
                <Card
                  onClick={() => handleCardClick(noticia._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <CardMedia
                    component="img"
                    height={index === 0 ? "300" : "140"} // Imagen más alta para la primera noticia
                    image={
                      noticia.image ||
                      "https://res.cloudinary.com/dsooxiydo/image/upload/v1735216082/sgbynryaedq7k6mo5tug.jpg"
                    }
                    alt={noticia.title || "Imagen de la noticia"}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "orange",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        {noticia.category}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <CalendarToday fontSize="small" color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.875rem", fontWeight: "bold" }}
                        >
                          {noticia.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant={index === 0 ? "h4" : "h5"} // Título más grande para la primera noticia
                      component="div"
                      gutterBottom
                    >
                      {noticia.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: index === 0 ? "block" : "none" }} // Descripción para la primera noticia
                    >
                      {noticia.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};
