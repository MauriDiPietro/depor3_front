import { Grid } from "@mui/material";

const Entrevistas = () => {
  const links = [
    "https://heyzine.com/flip-book/7900c8ed6c.html",
    "https://heyzine.com/flip-book/3943bf4b69.html",
    "https://heyzine.com/flip-book/c653a4b5a9.html",
    "https://heyzine.com/flip-book/855ab8bf83.html",
    "https://heyzine.com/flip-book/1b3dbaa2cc.html",
    "https://heyzine.com/flip-book/1b584a383b.html",
    "https://heyzine.com/flip-book/517d4adce8.html",
    "https://heyzine.com/flip-book/07e5e55368.html",
  ];
  return (
    <Grid container>
      {links.map((link) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ padding: 5 }}>
            <iframe
              allowFullScreen
              className="fp-iframe"
              style={{
                border: "1px solid lightgray;",
                width: "100%",
                height: "400px",
              }}
              src={link}
            ></iframe>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Entrevistas;
