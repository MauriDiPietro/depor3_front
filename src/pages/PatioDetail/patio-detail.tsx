import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
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

export const PatioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const getNewPatioById = useGlobalStore((state) => state.getNewPatioById);
  const loadingNews = useGlobalStore((state) => state.loadingNews);
  const newPatio = useGlobalStore((state) => state.newPatio);

  useEffect(() => {
    if (id) {
      getNewPatioById(id);
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

  if (!newPatio) {
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
    <title>{newPatio.title}</title>
    <meta property="og:title" content={newPatio.title} />
    <meta property="og:description" content={'depor3.com'} />
    <meta property="og:image" content={newPatio.image} />
    <meta property="og:url" content={`https://www.depor3.com/news/${newPatio._id}`} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={newPatio.image} />
  </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={newPatio.category !== "Patio del deportista" ? 8 : 12}
              lg={newPatio.category !== "Patio del deportista" ? 8 : 12}
              // md={12}
              // lg={12}
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
                    {newPatio.title}
                  </Typography>
                </Grid>

                {newPatio.category !== "Patio del deportista" && (
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
                          {newPatio.category}
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
                          {newPatio.author}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
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
                          {formatDate(newPatio.date)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {newPatio.isOld && !newPatio.multimedia.length && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={newPatio.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                {!newPatio.isOld && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={newPatio.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SanitizedHtml
                    htmlContent={newPatio.body}
                    category={newPatio.category}
                    newDetail={newPatio}
                  />
                </Grid>

              </Grid>
            </Grid>
            {newPatio.category !== "Patio del deportista" && (
              <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <PublicidadesDerecha />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ShareButtons id={newPatio._id} isPatio={true}/>
    </Container>
  );
};

