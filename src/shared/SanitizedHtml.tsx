import React from "react";
import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";
import { Publicidades } from "./Publicidades";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


interface SanitizedHtmlProps {
  htmlContent: string;
  category: string;
  newDetail: any;
}

export const SanitizedHtml: React.FC<SanitizedHtmlProps> = ({
  htmlContent,
  category,
  newDetail
}) => {
  // Sanitize the HTML string
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  // Función para detectar enlaces de YouTube y reemplazarlos con iframes
  // const replaceYouTubeLinksWithIframes = (htmlString: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // Buscar todos los enlaces <a> en el contenido
  //   const links = doc.querySelectorAll("a");

  //   links.forEach((link) => {
  //     const href = link.getAttribute("href");

  //     if (href) {
  //       let videoId: string | null = null;

  //       // Detectar enlaces tipo youtube.com/watch?v=
  //       if (href.includes("youtube.com/watch?v=")) {
  //         videoId = new URL(href).searchParams.get("v");
  //       }

  //       // Detectar enlaces tipo youtu.be/
  //       else if (href.includes("youtu.be/")) {
  //         videoId = href.split("youtu.be/")[1]?.split("?")[0] || null;
  //       }

  //       if (videoId) {
  //         // Crear un contenedor centrado con el iframe del video
  //         const iframeContainer = document.createElement("div");
  //         iframeContainer.style.textAlign = "center";
  //         iframeContainer.style.margin = "20px 0";

  //         iframeContainer.innerHTML = `
  //           <iframe
  //             width="560"
  //             height="315"
  //             src="https://www.youtube.com/embed/${videoId}"
  //             title="YouTube video player"
  //             frameborder="0"
  //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //             allowfullscreen
  //             style="max-width: 100%;"
  //           ></iframe>
  //         `;

  //         // Reemplazar el enlace <a> con el iframe
  //         link.replaceWith(iframeContainer);
  //       }
  //     }
  //   });

  //   return doc.body.innerHTML;
  // };

  const replaceYouTubeLinksAndModifyAnchors = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    const links = doc.querySelectorAll("a");
  
    links.forEach((link) => {
      const href = link.getAttribute("href");
  
      if (href) {
        let videoId: string | null = null;
  
        // Detectar enlaces de YouTube y reemplazar con iframes
        if (href.includes("youtube.com/watch?v=")) {
          videoId = new URL(href).searchParams.get("v");
        } else if (href.includes("youtu.be/")) {
          videoId = href.split("youtu.be/")[1]?.split("?")[0] || null;
        }
  
        if (videoId) {
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
  
          link.replaceWith(iframeContainer);
        } else {
          // Modificar el enlace para abrir en una nueva pestaña
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      }
    });
  
    return doc.body.innerHTML;
  };
  

  // Modificar el contenido para insertar videos de YouTube como iframes
  const contentWithVideos = replaceYouTubeLinksAndModifyAnchors(sanitizedContent);

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
    if (paragraphs.length === 3) {
      const thirdParagraph = paragraphs[2]; // El tercer párrafo (índice 2)

      // Crear el componente con la primera imagen aleatoria
      const cardElement = document.createElement("div");
      cardElement.innerHTML = `
      <div>
        <img class="publi" src="${shuffledImages[0]}" alt="Publicidad 1" />
        <img class="publi" src="${shuffledImages[1]}" alt="Publicidad 2" />
      </div>
    `;

      // Insertar después del tercer párrafo
      thirdParagraph.insertAdjacentElement("afterend", cardElement);
    }
    if (paragraphs.length > 3) {
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
            margin-top: 8px;
            margin-bottom: 8px;
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
            max-width: 100%;
            height: auto;
            margin: 0 auto;
          }


          figcaption {
            color: grey;
            text-align: center;
            margin-top: 8px;
            font-size: 12px;
          }
        `}</style>
      )}
                  {newDetail.multimedia.length > 0 && !newDetail.isOld && (
                    <Box
                      sx={{
                        padding: "0",
                        margin: "0 auto",
                        marginBottom: "8px",
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
                  {/* {newDetail.multimedia.length > 0 &&
                    newDetail.category === "Patio del deportista" &&
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
                    })} */}
      <Publicidades />
    </Box>
  );
};
