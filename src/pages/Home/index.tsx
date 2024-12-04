import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";

export const Home: React.FC<{}> = () => {

  const [noticias, setNoticias] = useState<any[]>([]);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news", {
        method: 'GET',
        credentials: 'include', // Permitir envío de cookies o credenciales
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido
        },
      });
      const response = await res.json();
      console.log(response.data);
      if (response.data.length === 0) setNoticias([]);
      else setNoticias(response.data);
    } catch (error) {
      alert((error as Error).message);
    }
  };



  useEffect(() => {
    if (noticias.length === 0) fetchNews();
  }, [noticias]);

  return (
    <>
      <Container sx={{ mt: 9 }} maxWidth="xl">
      </Container>
      {/* <img src="https://picsum.photos/200/300?random=1" alt="No image" />
      <h3>Producto 1</h3>
      <p>$100</p>
      <button>Comprar</button>
      <br />- */}
      {noticias &&
        noticias.map((noticia) => {
          return (
            <>
              {/* <img src={noticia.image} alt="no img" /> */}
              <h3>{noticia.title}</h3>
              {/* {noticia.price ? <p>${noticia.price}</p> : null}
              {<h3>Inicia: {noticia.startDate.description}</h3>}
              {<h3>Termina: {noticia.endDate.description}</h3>} */}
            </>
          );
        })}
    </>
  );
};
