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
// import ShareButtons from "../../shared/ShareButtons";

export const DraftsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const getDraftById = useGlobalStore((state) => state.getDraftById);
  const loadingDrafts = useGlobalStore((state) => state.loadingDrafts);
  const draftDetail = useGlobalStore((state) => state.draftDetail);

  useEffect(() => {
    if (id) {
      getDraftById(id);
    }
  }, [id]);

  if (loadingDrafts) {
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

  if (!draftDetail) {
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
    <title>{draftDetail.title}</title>
    <meta property="og:title" content={draftDetail.title} />
    <meta property="og:description" content={'depor3.com'} />
    <meta property="og:image" content={draftDetail.image} />
    <meta property="og:url" content={`https://www.depor3.com/news/${draftDetail._id}`} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={draftDetail.image} />
  </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={draftDetail.category !== "Patio del deportista" ? 8 : 12}
              lg={draftDetail.category !== "Patio del deportista" ? 8 : 12}
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
                    {draftDetail.title}
                  </Typography>
                </Grid>

                {draftDetail.category !== "Patio del deportista" && (
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
                          {draftDetail.category}
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
                          {draftDetail.author}
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
                          {formatDate(draftDetail.date)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {draftDetail.isOld && !draftDetail.multimedia.length && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={draftDetail.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                {!draftDetail.isOld && (
                  <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={draftDetail.image}
                        alt={""}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SanitizedHtml
                    htmlContent={draftDetail.body}
                    category={draftDetail.category}
                    newDetail={draftDetail}
                  />
                </Grid>
              </Grid>
            </Grid>
            {draftDetail.category !== "Patio del deportista" && (
              <Grid item xs={12} md={4} sx={{ paddingLeft: 2 }}>
                <PublicidadesDerecha />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <ShareButtons id={draftDetail._id} /> */}
    </Container>
  );
};