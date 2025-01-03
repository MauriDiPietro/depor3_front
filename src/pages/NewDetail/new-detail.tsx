import { useParams } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useGlobalStore } from "../../stores/global";
import { SanitizedHtml } from "../../shared/SanitizedHtml";

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const getNewById = useGlobalStore((state) => state.getNewById);
  const loadingNews = useGlobalStore((state) => state.loadingNews);
  const newDetail = useGlobalStore((state) => state.newDetail);

  useEffect(() => {
    if (id) {
      getNewById(id);
    }
  }, [id]);

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
    <Container sx={{ mt: 9 }}>
      <Typography variant="h3" component="div" gutterBottom>
        {newDetail.title}
      </Typography>
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
      <Box sx={{ mb: 2 }}>
        <img
          src={newDetail.image}
          alt={""}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Box>
      <SanitizedHtml htmlContent={newDetail.body} />
      {newDetail.multimedia.length > 0 &&
        newDetail.multimedia.map((media, index) => {
          return (
            <Box sx={{ mb: 2 }}>
              <img
                key={index}
                src={media}
                alt={""}
                style={{ width: "50%", height: "50%", borderRadius: "8px" }}
              />
            </Box>
          );
        })}
      {/* <Typography variant="body1" component="div">
        {newDetail.body}
      </Typography> */}
    </Container>
  );
};
