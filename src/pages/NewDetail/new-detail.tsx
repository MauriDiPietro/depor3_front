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
    <Helmet>
    <title>{newDetail.title}</title>
    <meta property="og:title" content={newDetail.title} />
    <meta property="og:description" content={'depor3.com'} />
    <meta property="og:image" content={newDetail.image} />
    <meta property="og:url" content={`https://www.depor3.com/news/${newDetail._id}`} />
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
                            // backgroundColor: "orange",
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
                    <Box sx={{ mb: 2 }}>
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
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={newDetail.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SanitizedHtml
                    htmlContent={newDetail.body}
                    category={newDetail.category}
                    newDetail={newDetail}
                  />
                </Grid>

                {/* Slider de imágenes */}
                {/* <Grid item xs={6} sm={6} md={12} lg={12}>
                  {newDetail.multimedia.length > 0 && !newDetail.isOld && (
                    <Box
                      sx={{
                        padding: "0",
                        margin: "0 auto",
                        maxWidth: { xs: "400px", md: "800px" },
                      }}
                    >
                      <Swiper
                        navigation
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        style={{
                          width: "100%", // Asegura que el slider ocupe todo el ancho del contenedor
                          overflow: "hidden", // Evita que el contenido desborde
                          // margin: "0", //
                        }}
                      >
                        {newDetail.multimedia.map((url, index) => (
                          <SwiperSlide key={index}>
                            <a href={url} target="_blank">
                              <img
                                src={url}
                                alt={`Multimedia ${index + 1}`}
                                style={{
                                  width: "100%",
                                  borderRadius: "8px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  )}
                </Grid> */}

                {/* <Grid item xs={12} md={12} lg={12}>
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
                </Grid> */}
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
