import Slider from "react-slick";
import { Typography, Box } from "@mui/material";
import { useGlobalStore } from "../../../stores/global";

export const NewsSlider = () => {
  const news = useGlobalStore((state) => state.news);
  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Últimas 4 noticias
  const recentNews = news.slice(-4);

  return (
    <Box sx={{ mb: 5 }}>
      <Slider {...settings}>
        {recentNews.map((noticia, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={noticia.image}
              alt={noticia.title}
              style={{
                width: "50%",
                height: "10px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
            >
              {noticia.title}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};


