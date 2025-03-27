import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentsService from "../../../lib/services/comments.service";
// import { parseDateToSort } from "../../../lib/services/utils/ordenamiento";

export const PatioGrid = () => {
  const newsPatio = useGlobalStore((state) => state.newsPatio);
  const getAllNewsPatio = useGlobalStore((state) => state.getAllNewsPatio);
  const loadingNews = useGlobalStore((state) => state.loadingNews);

  const navigate = useNavigate();

  const [comments, setComments] = useState<{ author: string; text: string }[]>(
    []
  );
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    getAllNewsPatio(1, 20, "");
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/patio/${id}`);
  };

  const fetchComments = async () => {
    try {
      const response = await CommentsService.getAllCommentsPatio();
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
        postId: "1",
        postType: "patios",
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
        <p>Cargando...</p>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
      {newsPatio &&
        newsPatio.map((noticia: New, index: any) => (
          <>
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(noticia._id)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="350"
                  image={
                    noticia.image
                      ? noticia.image
                      : noticia.multimedia[1] ||
                        "https://res.cloudinary.com/dsooxiydo/image/upload/v1735216082/sgbynryaedq7k6mo5tug.jpg"
                  }
                  alt={noticia.title || ""}
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
                    ></Box>
                  </Box>
                  <Typography variant="h5" component="div" gutterBottom>
                    {noticia.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}

      {/* 🔹 Formulario de comentarios */}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
          ¿Visitaste el Patio? ¡Dejanos tu comentario!
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
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
              <Typography sx={{ fontWeight: "bold", color: "orange" }}>
                {comment.author}:
              </Typography>
              <Typography sx={{ color: "white" }}>{comment.text}</Typography>
            </Box>
          ))
        )}
      </Grid>
    </Grid>
  );
};
