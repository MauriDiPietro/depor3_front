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
  IconButton,
  Button,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarToday, Search } from "@mui/icons-material";
import { formatDate } from "../../../lib/services/utils/fechas";
import CommentsService from "../../../lib/services/comments.service";
// import { parseDateToSort } from "../../../lib/services/utils/ordenamiento";

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

  const [searchText, setSearchText] = useState(""); // Estado para manejar el texto de búsqueda
  const [query, setQuery] = useState<string>(); // Texto para ejecutar la búsqueda

  const handleSearchClick = () => {
    setQuery(searchText); // Actualiza el query para ejecutar la búsqueda
    setCurrentPage(1); // Reinicia la página a la primera
    getAllNews(1, itemsPerPage, searchText); // Ejecuta la búsqueda con el texto actual
  };

  useEffect(() => {
    getAllNews(1, itemsPerPage);
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
    getAllNews(value, itemsPerPage, query);
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

  const filteredNews = news?.filter((noticia: New) =>
    noticia.active &&
    noticia.category !== "Patio del deportista" &&
    (query ? noticia.title.toLowerCase().includes(query.toLowerCase()) : true)
  );

    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

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
        if(response) alert("Gracias por enviar tu comentario.");
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
                <Button variant="contained" color="primary" fullWidth
                onClick={handleSubmit}
                >
                  Enviar comentario
                </Button>
              </Grid>
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
                  {/* Barra de búsqueda */}
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Buscar noticias..."
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleSearchClick}>
                              <Search />
                            </IconButton>
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
                  {/* PUBLICIDAD MUNI */}
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: isMobile ? "100px" : "auto",
                        width: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1742467374/m6hsm6r6wvyoupugwolf.jpg"
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
    </Box>
  );
};
