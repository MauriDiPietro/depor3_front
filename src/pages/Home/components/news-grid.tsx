import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    // <Container sx={{ mt: 2 }} maxWidth="xl">
    <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
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
          <>
            {index === 0 ? (
              <Grid container item xs={12} sm={12} md={12} spacing={2} key={index}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Card
                    onClick={() => handleCardClick(noticia._id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="333"
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
                        {noticia.category && (
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
                        )}
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
                      <Typography variant="h5" component="div" gutterBottom>
                        {noticia.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {noticia.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  {/* PUBLICIDAD */}
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: isMobile ? "200px" : "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735907187/ocpmyjczavpe2olpnqtk.png"
                      alt="Publicidad"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {/* PUBLICIDAD */}
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: isMobile ? "100px" : "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735910641/pm0cn0it3g9xp8vkxand.jpg"
                      alt="Publicidad"
                    />
                  </Card>
                </Grid>
              </Grid>
            ) : (
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
                      {noticia.category && (
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
                      )}
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
                    <Typography variant="h5" component="div" gutterBottom>
                      {noticia.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </>
        ))}
  </Grid>
  
    // </Container>
  );
};
