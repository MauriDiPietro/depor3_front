import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../stores/global";
import { SanitizedHtml } from "../../shared/SanitizedHtml";
import { CalendarToday, Person } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PublicidadesDerecha } from "../../shared/Publicidades-derecha";
import { formatDate } from "../../lib/services/utils/fechas";
import { Helmet } from "react-helmet-async";
import ShareButtons from "../../shared/ShareButtons";
import CommentsService from "../../lib/services/comments.service";

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const getNewById = useGlobalStore((state) => state.getNewById);
  const loadingNews = useGlobalStore((state) => state.loadingNews);
  const newDetail = useGlobalStore((state) => state.newDetail);

  const [comments, setComments] = useState<{ author: string; text: string }[]>(
    []
  );
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      getNewById(id);
      fetchComments();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getNewById(id);
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await CommentsService.getAllComments(
        "news",
        id as string
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error al obtener comentarios", error);
    }
  };

  const handleSubmit = async () => {
    if (!author.trim() || !text.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const body = {
        postId: newDetail?._id as string,
        postType: "news",
        author,
        text,
      };

      const response = await CommentsService.createComment(body);

      setComments([...comments, response.data]);
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Error al enviar el comentario", error);
    }
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
      </Box>
    );
  }

  if (!newDetail) {
    return (
      <Container sx={{ mt: 9 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Noticia no encontrada
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: { xs: 6, md: 9 } }}>
      <Helmet>
        <title>{newDetail.title}</title>
        <meta property="og:title" content={newDetail.title} />
        <meta property="og:description" content={"depor3.com"} />
        <meta property="og:image" content={newDetail.image} />
        <meta
          property="og:url"
          content={`https://www.depor3.com/news/${newDetail._id}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={newDetail.image} />
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={newDetail.category !== "Patio del deportista" ? 8 : 12}
              lg={newDetail.category !== "Patio del deportista" ? 8 : 12}
            >
              <Grid container>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2rem" },
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {newDetail.title}
                  </Typography>
                </Grid>

                {newDetail.category !== "Patio del deportista" && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid container>
                      <Grid item xs={12} md={4} lg={4}>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                          sx={{
                            backgroundColor: "orange",
                            color: "white",
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "0.875rem",
                            fontWeight: "bold",
                          }}
                        >
                          {newDetail.category}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Person fontSize="small" color="action" />
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                          sx={{
                            color: "white",
                            display: "inline-block",
                            padding: "4px 6px",
                            fontWeight: "bold",
                          }}
                        >
                          {newDetail.author}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          gutterBottom
                          sx={{
                            color: "white",
                            display: "inline-block",
                            padding: "4px 6px",
                            fontWeight: "bold",
                          }}
                        >
                          {formatDate(newDetail.date)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {newDetail.isOld && !newDetail.multimedia.length && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box>
                      <img
                        src={newDetail.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                {!newDetail.isOld && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box>
                      <img
                        src={newDetail.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <SanitizedHtml
                    htmlContent={newDetail.body}
                    category={newDetail.category}
                    newDetail={newDetail}
                  />
                </Grid>

                {/* 🔹 Formulario de comentarios */}
                <Grid item xs={12} sx={{ mt: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
                    Deja tu comentario
                  </Typography>
                  <TextField
                    label="Nombre"
                    placeholder="Nombre"
                    variant="outlined"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Comentario"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Enviar comentario
                  </Button>
                </Grid>

                {/* 🔹 Lista de comentarios */}
                <Grid item xs={12} sx={{ mt: 4, textAlign: "left" }}>
                  <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
                    Comentarios
                  </Typography>
                  {!comments.length ? (
                    <Typography sx={{ color: "white" }}>
                      No hay comentarios aún.
                    </Typography>
                  ) : (
                    comments.map((comment, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: "8px",
                          backgroundColor: "#333",
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "bold", color: "orange" }}
                        >
                          {comment.author}
                        </Typography>
                        <Typography sx={{ color: "black" }}>
                          {comment.text}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
            {newDetail.category !== "Patio del deportista" && (
              <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <PublicidadesDerecha />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <ShareButtons id={newDetail._id} isPatio={false} />
    </Container>
  );
};
