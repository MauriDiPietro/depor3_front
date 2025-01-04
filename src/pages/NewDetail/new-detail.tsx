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
    <Container sx={{ mt: 9 }}>
      <Typography variant="h3" component="div" gutterBottom>
        {newDetail.title}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
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
          {!newDetail.isOld && (
            <Box sx={{ mb: 2 }}>
              <img
                src={newDetail.image}
                alt={""}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}
          {newDetail.isOld && newDetail.multimedia.length === 0 && (
            <Box sx={{ mb: 2 }}>
              <img
                src={newDetail.image}
                alt={""}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}
          {newDetail.isOld && newDetail.multimedia.length === 1 && (
            <Box sx={{ mb: 2 }}>
              <img
                src={newDetail.image}
                alt={""}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}
          <SanitizedHtml htmlContent={newDetail.body} />
          {newDetail.multimedia.length > 0 &&
            !newDetail.isOld &&
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
          {newDetail.multimedia.length > 1 &&
            newDetail.isOld &&
            newDetail.multimedia.slice(0, -1).map((media, index) => {
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
          {newDetail.multimedia.length === 1 &&
            newDetail.isOld &&
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
          <Card>
            <CardMedia
              component="img"
              // height="300"
              image="https://res.cloudinary.com/dsooxiydo/image/upload/v1735988672/zbpjwnbpd8hiorvk9rai.jpg"
              alt=""
            />
          </Card>
        </Grid>
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
      </Grid>
    </Container>
  );
};
