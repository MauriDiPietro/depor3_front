import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    CircularProgress,
    // useTheme,
    // useMediaQuery,
    Pagination,
  } from "@mui/material";
  import { New } from "../../../types/new.type";
  import { useGlobalStore } from "../../../stores/global";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { CalendarToday } from "@mui/icons-material";
  
  export const HistoriasGrid = () => {
    const news = useGlobalStore((state) => state.news);
    const getAllNews = useGlobalStore((state) => state.getAllNews);
    const loadingNews = useGlobalStore((state) => state.loadingNews);
    const totalPages = useGlobalStore((state) => state.totalPages);
  
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Número de noticias por página
  
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    useEffect(() => {
      getAllNews(1, itemsPerPage, "", "Historias");
    }, []);
  
    const handleCardClick = (id: string) => {
      navigate(`/news/${id}`);
    };
  
    const handlePageChange = (_event, value) => {
      setCurrentPage(value);
      getAllNews(value, itemsPerPage, "", "Historias");
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
          <CircularProgress color="info"/>
          <p>Cargando...</p>
        </Box>
      );
    }
  
    // Filtrar y ordenar noticias
    const filteredNews = news
      ?.filter(
        (noticia: New) =>
          noticia.active && noticia.category == "Historias" || noticia.category == "historias"
      )
      .sort((a: New, b: New) => {
        const dateA = new Date(a.date.split("/").reverse().join("/"));
        const dateB = new Date(b.date.split("/").reverse().join("/"));
        return dateB.getTime() - dateA.getTime();
      });
  
    return (
      <Box>
        <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
          {filteredNews.map((noticia: New, _index: number) => (
            <>
                <Grid item xs={12} sm={6} md={4} key={noticia._id}>
                  <Card
                    onClick={() => handleCardClick(noticia._id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
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
            </>
          ))}
        </Grid>
  
        {/* Paginado */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    );
  };
  