import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { useEffect } from "react";
import { useGlobalStore } from "../../stores/global";
import { SanitizedHtml } from "../../shared/SanitizedHtml";
import { CalendarToday, Person } from "@mui/icons-material";

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
    <Container sx={{ mt: { xs: 6, md: 9 } }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={newDetail.category !== "Patio del deportista" ? 8 : 12}
        >
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, textAlign: "left" }}
          >
            {newDetail.title}
          </Typography>
          {newDetail.category !== "Patio del deportista" && (
            <Grid container spacing={2}>
              {newDetail.category && (
                <Grid item xs={12} md={4} sx={{ pl: 2 }}>
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
              )}
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <CalendarToday fontSize="small" color="action" />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                  sx={{
                    // backgroundColor: "orange",
                    color: "white",
                    display: "inline-block",
                    padding: "4px 6px",
                    fontWeight: "bold",
                  }}
                >
                  {newDetail.date}
                </Typography>
              </Grid>
            </Grid>
          )}
          {/* si no tiene imagenes secundarias */}
          {newDetail.isOld && !newDetail.multimedia.length && (
            // newDetail.category !== "Patio del deportista" &&
            <Box sx={{ mb: 2 }}>
              <img
                src={newDetail.image}
                alt={""}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}

          <SanitizedHtml
            htmlContent={newDetail.body}
            category={newDetail.category}
          />
                      
          {newDetail.multimedia.length > 0 &&
            !newDetail.isOld &&
            newDetail.multimedia.map((media, index) => {
              return (
                <Box sx={{ mb: 2 }}>
                  <img
                    key={index}
                    src={media}
                    alt={""}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              );
            })}
          {newDetail.category !== "Patio del deportista" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735988672/zbpjwnbpd8hiorvk9rai.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/aceros-rio.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/garbo.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/rino.jpg"
                      alt=""
                    />
                  </Card>
                  <Card>
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143686/toalson.jpg"
                      alt=""
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}
          {newDetail.category === "Patio del deportista" && (
  <Grid container spacing={2} sx={{ width: "100%", margin: 0 }}>
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1735988672/zbpjwnbpd8hiorvk9rai.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/aceros-rio.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/garbo.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/rino.jpg",
          "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143686/toalson.jpg",
        ].map((image, index) => (
          <Card key={index} sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              image={image}
              alt={`Imagen ${index + 1}`}
              sx={{
                width: "100%",
                height: "auto",
              }}
            />
          </Card>
        ))}
      </Box>
    </Grid>
  </Grid>
)}

        </Grid>
        {newDetail.category !== "Patio del deportista" && (
          <Grid item xs={12} md={4} sx={{ padding: 2 }}>
            <Grid container>
              <Grid item xs={12} md={12} sx={{ marginBottom: 2 }}>
                <Card>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735988671/fc16ju4gqnm0cyxtms8u.jpg"
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735988672/ywiyilcqqdxh3bcy64ws.jpg"
                    alt=""
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
