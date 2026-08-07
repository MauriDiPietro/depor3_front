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
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CalendarToday } from "@mui/icons-material";
import { formatDate } from "../../../lib/services/utils/fechas";
import CommentsService from "../../../lib/services/comments.service";
import { NewsFilters } from "../../../lib/services/news.sevice";
// import { parseDateToSort } from "../../../lib/services/utils/ordenamiento";

const emptyFilters: NewsFilters = {
  title: "",
  category: "",
  author: "",
  dateFrom: "",
  dateTo: "",
};

export const NewsGrid = () => {
  const news = useGlobalStore((state) => state.news);
  const getAllNews = useGlobalStore((state) => state.getAllNews);
  const totalPages = useGlobalStore((state) => state.totalPages);
  const currentPage = useGlobalStore((state) => state.currentPage);
  const setCurrentPage = useGlobalStore((state) => state.setCurrentPage);

  const loadingNews = useGlobalStore((state) => state.loadingNews);

  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Número de noticias por página

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState<NewsFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<NewsFilters>(emptyFilters);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const cleanFilters = (values: NewsFilters) =>
    Object.fromEntries(
      Object.entries(values).filter(([, value]) => value?.trim())
    ) as NewsFilters;

  const handleFilterChange =
    (field: keyof NewsFilters) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: event.target.value,
      }));
    };

  const handleFilterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextFilters = cleanFilters(filters);

    setAppliedFilters(nextFilters);
    setCurrentPage(1); // Reinicia la página a la primera
    getAllNews(1, itemsPerPage, nextFilters);
  };

  const handleClearFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    getAllNews(1, itemsPerPage);
  };

  useEffect(() => {
    getAllNews(1, itemsPerPage);
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
    getAllNews(value, itemsPerPage, appliedFilters);
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

  const filteredNews = news?.filter(
    (noticia: New) =>
      noticia.active && noticia.category !== "Patio del deportista"
  );

  const handleSubmit = async () => {
    if (!author.trim() || !text.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const body = {
        postId: "1",
        postType: "patios",
        author,
        text,
      };

      const response = await CommentsService.createComment(body);
      if (response) alert("Gracias por enviar tu comentario.");
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Error al enviar el comentario", error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
        {/* 🔹 Formulario de comentarios */}
        <Grid item xs={12} sx={{ mt: 0 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
            ¿Visitaste el Patio del deportista? ¡Dejanos tu comentario!
          </Typography>
          <TextField
            label="Nombre"
            placeholder="Nombre"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Comentario"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Enviar comentario
          </Button>
        </Grid>
        {filteredNews.length === 0 && (
          <Grid item xs={12}>
            <Alert
              severity="warning"
              sx={{
                alignItems: "center",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                No se encontraron resultados, intentá con otros parámetros de
                búsqueda o hace click en{" "}
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClearFilters}
                  sx={{
                    mx: 0.5,
                    my: 0.5,
                    px: 1.5,
                    py: 0.5,
                    verticalAlign: "middle",
                    fontWeight: "bold",
                    color: "warning.contrastText",
                    whiteSpace: "nowrap",
                  }}
                >
                  Limpiar Filtros
                </Button>{" "}
                para ver todo
              </Typography>
            </Alert>
          </Grid>
        )}
        {filteredNews.map((noticia: New, index: number) => (
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
                            {formatDate(noticia.date)}
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
                  {/* Filtros de noticias */}
                  <Box component="form" onSubmit={handleFilterSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Título"
                          placeholder="Título"
                          variant="outlined"
                          fullWidth
                          value={filters.title}
                          onChange={handleFilterChange("title")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Categoría"
                          placeholder="Categoría"
                          variant="outlined"
                          fullWidth
                          value={filters.category}
                          onChange={handleFilterChange("category")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Autor"
                          placeholder="Autor"
                          variant="outlined"
                          fullWidth
                          value={filters.author}
                          onChange={handleFilterChange("author")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Desde"
                          type="date"
                          variant="outlined"
                          fullWidth
                          value={filters.dateFrom}
                          onChange={handleFilterChange("dateFrom")}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Hasta"
                          type="date"
                          variant="outlined"
                          fullWidth
                          value={filters.dateTo}
                          onChange={handleFilterChange("dateTo")}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "flex-end",
                            flexDirection: isMobile ? "column" : "row",
                          }}
                        >
                          <Button
                            type="button"
                            variant="outlined"
                            color="inherit"
                            onClick={handleClearFilters}
                          >
                            Limpiar Filtros
                          </Button>
                          <Button type="submit" variant="contained" color="primary">
                            Buscar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  {/* PUBLICIDAD COOP DE PIE DERECHA */}
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: isMobile ? "200px" : "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1785390632/muni-r3-07-2026.jpg_alnrs1.jpg"
                      alt="Publicidad"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {/* PUBLICIDAD MUNI BANNER ALARGADO */}
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: isMobile ? "100px" : "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1786130473/EXPO_360%C2%BA_GR%C3%81FICA_WEB_1200_x_150_px_oefea5.png"
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
                          {formatDate(noticia.date)}
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
      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          py: 2,
          textAlign: "center",
          color: "#abb2b9",
        }}
      >
        <Divider />
        <Typography variant="body2" sx={{ marginTop: "20px" }}>
          Di Pietro Desarrollo Web - dipietro.jm@gmail.com -
          <a
            href="https://wa.me/3571542964"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#abb2b9", textDecoration: "none" }}
          >
            3571542964
          </a>
        </Typography>
      </Box>
    </Box>
  );
};
