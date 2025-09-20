import { Grid, Typography, Box } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Entrevistas = () => {
  const entrevistas = [
    { name: "David Barrera", pdf: "barrera.pdf", thumb: "barrera.jpg" },
    {
      name: "Assum y Reinaudi",
      pdf: "assum-reinaudi.pdf",
      thumb: "assum-reinaudi.jpg",
    },
    {
      name: "Juan Manuel Fernandez",
      pdf: "fernandez.pdf",
      thumb: "fernandez.jpg",
    },
    { name: "Lito Oviedo", pdf: "oviedo.pdf", thumb: "oviedo.jpg" },
    {
      name: "Tadeo Gaggiofatto",
      pdf: "gaggiofatto.pdf",
      thumb: "gaggiofatto.JPG",
    },
    {
      name: "Agustina Sanchez Pignatta",
      pdf: "pignatta.pdf",
      thumb: "pignatta.jpeg",
    },
    {
      name: "Facundo Mascanfroni",
      pdf: "mascanfroni.pdf",
      thumb: "mascanfroni.jpeg",
    },
    { name: "Nito Rodríguez", pdf: "rodriguez.pdf", thumb: "rodriguez.jpeg" },
    { name: "Gastón Giraudo", pdf: "giraudo.pdf", thumb: "giraudo.jpeg" },
    { name: "Fernando Vazquez", pdf: "vazquez.pdf", thumb: "vazquez.jpg" },
    { name: "Juan Manuel López", pdf: "lopez.pdf", thumb: "lopez.jpeg" },
    {
      name: "Ramón Alberto Benavidez",
      pdf: "benavidez.pdf",
      thumb: "benavidez.jpeg",
    },
    {
      name: "Ferando Cantarini",
      pdf: "cantarini.pdf",
      thumb: "cantarini.jpeg",
    },
  ];

  return (
    <Grid container sx={{ marginTop: 5 }}>
      {entrevistas.map(({ name, pdf, thumb }, index) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{ padding: 5 }}
          key={index}
        >
          <Box
            component="a"
            href={`/entrevistas/${pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: "relative",
              display: "block",
              width: "50%",
              margin: "0 auto",
              "&:hover .hover-overlay": {
                opacity: 1,
              },
            }}
          >
            <img
              src={`/entrevistas/thumbnails/${thumb}`}
              alt={`Entrevista ${index + 1}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                border: "1px solid lightgray",
                borderRadius: 8,
                display: "block",
              }}
            />
            <Box
              className="hover-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Abrir <OpenInNewIcon fontSize="small" />
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontWeight: 500, color: "white", marginTop: 1 }}
          >
            {name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Entrevistas;
