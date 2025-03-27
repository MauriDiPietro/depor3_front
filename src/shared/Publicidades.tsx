import { Box, Card, CardMedia, Grid } from "@mui/material";

export const Publicidades: React.FC<{}> = () => {

  const imageUrls = [
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/aceros-rio.jpg",
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/garbo.jpg",
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/rino.jpg",
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143686/toalson.jpg",
    "https://res.cloudinary.com/dsooxiydo/image/upload/v1735988672/zbpjwnbpd8hiorvk9rai.jpg",
  ];

  // Mezclar las URLs aleatoriamente
  const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

  return (
    <Grid container sx={{marginTop: 2}}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {shuffledImages.map((image, index) => (
            <Card key={index} sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                image={image}
                alt={`Imagen ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  alignItems: "center",
                }}
              />
            </Card>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
