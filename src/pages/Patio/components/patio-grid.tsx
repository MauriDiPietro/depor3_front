import {
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
// import { parseDateToSort } from "../../../lib/services/utils/ordenamiento";

export const PatioGrid = () => {
  const newsPatio = useGlobalStore((state) => state.newsPatio);
  const getAllNewsPatio = useGlobalStore((state) => state.getAllNewsPatio);
  const loadingNews = useGlobalStore((state) => state.loadingNews);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNewsPatio(1, 20, "");
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/patio/${id}`);
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
        newsPatio
          // .filter(
          //   (noticia: New) =>
          //     noticia.active && noticia.category == "Patio del deportista"
          // )
          // .sort((a: New, b: New) => {
          //   const dateA = parseDateToSort(a.date);
          //   const dateB = parseDateToSort(b.date);

          //   if (!dateA || !dateB) return 0; // Manejar fechas nulas

          //   return dateB.getTime() - dateA.getTime(); // Orden descendente
          // })
          .map((noticia: New, index: any) => (
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
                        noticia.image ? noticia.image : noticia.multimedia[1] ||
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
                        >
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
  );
};

