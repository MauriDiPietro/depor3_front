import React from "react";
import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";
import { Publicidades } from "./Publicidades";

interface SanitizedHtmlProps {
  htmlContent: string;
  category: string;
}

export const SanitizedHtml: React.FC<SanitizedHtmlProps> = ({
  htmlContent,
  category,
}) => {
  // Sanitize the HTML string
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  // Función para detectar enlaces de YouTube y reemplazarlos con iframes
  const replaceYouTubeLinksWithIframes = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Buscar todos los enlaces <a> en el contenido
    const links = doc.querySelectorAll("a");

    links.forEach((link) => {
      const href = link.getAttribute("href");

      if (href) {
        let videoId: string | null = null;

        // Detectar enlaces tipo youtube.com/watch?v=
        if (href.includes("youtube.com/watch?v=")) {
          videoId = new URL(href).searchParams.get("v");
        }

        // Detectar enlaces tipo youtu.be/
        else if (href.includes("youtu.be/")) {
          videoId = href.split("youtu.be/")[1]?.split("?")[0] || null;
        }

        if (videoId) {
          // Crear un contenedor centrado con el iframe del video
          const iframeContainer = document.createElement("div");
          iframeContainer.style.textAlign = "center";
          iframeContainer.style.margin = "20px 0";

          iframeContainer.innerHTML = `
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style="max-width: 100%;"
            ></iframe>
          `;

          // Reemplazar el enlace <a> con el iframe
          link.replaceWith(iframeContainer);
        }
      }
    });

    return doc.body.innerHTML;
  };

  // Modificar el contenido para insertar videos de YouTube como iframes
  const contentWithVideos = replaceYouTubeLinksWithIframes(sanitizedContent);

  // Función para insertar el componente después del tercer párrafo
  // const injectCardAfterThirdParagraph = (htmlString: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // Seleccionar todos los párrafos
  //   const paragraphs = doc.querySelectorAll("p");

  //   // Verificar si hay al menos tres párrafos
  //   if (paragraphs.length >= 3) {
  //     const thirdParagraph = paragraphs[2]; // El tercer párrafo (índice 2)

  //     // Crear el componente a insertar
  //     const cardElement = document.createElement("div");
  //     cardElement.innerHTML = `
  //       <div>
  //         <img class="publi"
  //           src="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg"
  //           alt=""
  //         />
  //       </div>
  //     `;

  //     // Insertar después del tercer párrafo
  //     thirdParagraph.insertAdjacentElement("afterend", cardElement);
  //   }

  //   if (paragraphs.length >= 5) {
  //     const fiveParagraph = paragraphs[4]; // quinto parrafo

  //     // Crear el componente a insertar
  //     const cardElement = document.createElement("div");
  //     cardElement.innerHTML = `
  //       <div>
  //         <img class="publi"
  //           src="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg"
  //           alt=""
  //         />
  //       </div>
  //     `;

  //     // Insertar después del quinto párrafo
  //     fiveParagraph.insertAdjacentElement("afterend", cardElement);
  //   }

  //   // Retornar el HTML modificado
  //   return doc.body.innerHTML;
  // };

  const injectCardAfterThirdParagraph = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // URLs de las imágenes
    const imageUrls = [
      "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg",
      "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg",
    ];

    // Mezclar las URLs aleatoriamente
    const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

    // Seleccionar todos los párrafos
    const paragraphs = doc.querySelectorAll("p");

    // Verificar si hay al menos tres párrafos
    if (paragraphs.length >= 3) {
      const thirdParagraph = paragraphs[2]; // El tercer párrafo (índice 2)

      // Crear el componente con la primera imagen aleatoria
      const cardElement = document.createElement("div");
      cardElement.innerHTML = `
      <div>
        <img class="publi" src="${shuffledImages[0]}" alt="Publicidad 1" />
      </div>
    `;

      // Insertar después del tercer párrafo
      thirdParagraph.insertAdjacentElement("afterend", cardElement);
    }

    // Verificar si hay al menos cinco párrafos
    if (paragraphs.length >= 5) {
      const fifthParagraph = paragraphs[4]; // El quinto párrafo (índice 4)

      // Crear el componente con la segunda imagen aleatoria
      const cardElement = document.createElement("div");
      cardElement.innerHTML = `
      <div>
        <img class="publi" src="${shuffledImages[1]}" alt="Publicidad 2" />
      </div>
    `;

      // Insertar después del quinto párrafo
      fifthParagraph.insertAdjacentElement("afterend", cardElement);
    }

    // Retornar el HTML modificado
    return doc.body.innerHTML;
  };

  // Insertar el contenido modificado
  const modifiedContent = injectCardAfterThirdParagraph(contentWithVideos);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
        style={{
          overflowX: "hidden",
          textAlign: "left",
          color: "white",
        }}
      />
      {category !== "Patio del deportista" ? (
        <style>{`
          .publi {
            padding-bottom: 8px;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
        * {
          color: white !important; 
          }
        `}</style>
      ) : (
        <style>{`
          figure {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            padding-bottom: 5px;
          }

          .publi{
            max-width: 100%;
          }
            
          img {
            width: auto;
            max-width: 60%;
            height: auto;
            margin: 0 auto;
          }


          figcaption {
            color: grey;
            text-align: center;
            margin-top: 8px;
          }
        `}</style>
      )}
      <Publicidades />
    </Box>
  );
};
