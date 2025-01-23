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
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarToday, Search } from "@mui/icons-material";
import { parseDateToSort } from "../../../lib/services/utils/ordenamiento";

export const NewsGrid = () => {
  const news = useGlobalStore((state) => state.news);
  const getAllNews = useGlobalStore((state) => state.getAllNews);
  const loadingNews = useGlobalStore((state) => state.loadingNews);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Número de noticias por página

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchText, setSearchText] = useState(""); // Estado para manejar el texto de búsqueda

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reinicia la página al buscar
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
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
        <CircularProgress color="info" />
        <p>Cargando...</p>
      </Box>
    );
  }

  // Filtrar y ordenar noticias
  const filteredNews = news
    ?.filter(
      (noticia: New) =>
        noticia.active &&
        noticia.category !== "Patio del deportista" &&
        noticia.title.toLowerCase().includes(searchText.toLowerCase()) // Filtrar por texto de búsqueda
    )
    .sort((a: New, b: New) => {
      const dateA = parseDateToSort(a.date);
      const dateB = parseDateToSort(b.date);

      if (!dateA || !dateB) return 0;

      return dateB.getTime() - dateA.getTime();
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
        {currentNews.map((noticia: New, index: number) => (
          <>
            {index === 0 ? (
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                spacing={2}
                key={noticia._id}
              >
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
                  {/* Barra de búsqueda */}
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Buscar noticias..."
                      value={searchText}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: isMobile ? "100%" : "100%" }}
                    />
                  </Box>
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
            )}
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
