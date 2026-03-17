import { Card, CardMedia, Grid, useMediaQuery, useTheme } from "@mui/material";

export const PublicidadesDerecha: React.FC<{}> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const imageUrls = [
    // "https://res.cloudinary.com/dsooxiydo/image/upload/v1735988671/fc16ju4gqnm0cyxtms8u.jpg",
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1773759851/muni-rio3_300_x_400_px_hcxqhf.png",
  ];

  const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

  return (
    <Grid container>
      {shuffledImages.map((image, index) => (
        <Grid item xs={12} md={12} lg={12} key={index}>
          <Card>
            <CardMedia
              component="img"
              style={{
                width: isMobile ? "50%" : "100%",
                paddingBottom: 8,
                paddingTop: isMobile ? 8 : 0,
              }}
              image={image}
              alt={`Publicidad ${index + 1}`}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
