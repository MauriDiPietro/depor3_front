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
            .filter((noticia: New) => noticia.active)
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
