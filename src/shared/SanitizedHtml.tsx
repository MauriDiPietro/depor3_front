import React from "react";
import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";
import { Publicidades } from "./Publicidades";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Tweet } from "react-tweet";

interface SanitizedHtmlProps {
  htmlContent: string;
  category: string;
  newDetail: any;
}

export const SanitizedHtml: React.FC<SanitizedHtmlProps> = ({
  htmlContent,
  category,
  newDetail,
}) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  const extractMedia = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

      // Buscar imágenes y ajustar epígrafes
      doc.querySelectorAll("p em").forEach((caption) => {
        const parent = caption.closest("p");
        if (parent) {
          parent.style.marginTop = "2px"; // Reducir espacio entre imagen y epígrafe
          parent.style.marginBottom = "0"; // Evitar espacio extra debajo del epígrafe
        }
      });

      doc.querySelectorAll("br").forEach((br) => br.remove());

    const tweetIds: string[] = [];
    const mediaMap: { [key: string]: JSX.Element } = {};

    doc.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      /*** 🔹 Detectar Twitter ***/
      if (href.includes("x.com/") || href.includes("twitter.com/")) {
        const tweetIdMatch = href.match(/status\/(\d+)/);
        if (tweetIdMatch) {
          const tweetId = tweetIdMatch[1];
          tweetIds.push(tweetId);
          mediaMap[tweetId] = <Tweet key={tweetId} id={tweetId} />;
          link.outerHTML = `<!--TWEET_${tweetId}-->`; // Marcador para reemplazo
        }
      }

      /*** 🔹 Detectar YouTube ***/
      let videoId: string | null = null;
      if (href.includes("youtube.com/watch?v=")) {
        videoId = new URL(href).searchParams.get("v");
      } else if (href.includes("youtu.be/")) {
        videoId = href.split("youtu.be/")[1]?.split("?")[0] || null;
      }

      if (videoId) {
        const iframe = `
          <div style="text-align: center; margin: 20px 0;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}"
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen style="max-width: 100%;">
            </iframe>
          </div>
        `;
        link.outerHTML = iframe;
      }
    });

    return { modifiedHtml: doc.body.innerHTML, mediaMap };
  };
  //@ts-ignore
  const { modifiedHtml, mediaMap } = extractMedia(sanitizedContent);

  const renderContent = (html: string) => {
    return html.split(/<!--TWEET_(\d+)-->/).map((part, index) => {
      if (/^\d+$/.test(part)) {
        return mediaMap[part]; // Insertar `<Tweet />`
      }
      return (
        <Typography
          key={index}
          component="div"
          style={{
            overflowX: "hidden",
            textAlign: "left",
            color: "white",
          }}
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });
  };


  // const injectCardAfterThirdParagraph = (htmlString: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   // URLs de las imágenes
  //   const imageUrls = [
  //     "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg",
  //     "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg",
  //   ];

  //   // Mezclar las URLs aleatoriamente
  //   const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);

  //   // Seleccionar todos los párrafos
  //   const paragraphs = doc.querySelectorAll("p");

  //   // Verificar si hay al menos tres párrafos
  //   if (paragraphs.length === 3) {
  //     const thirdParagraph = paragraphs[2]; // El tercer párrafo (índice 2)

  //     // Crear el componente con la primera imagen aleatoria
  //     const cardElement = document.createElement("div");
  //     cardElement.innerHTML = `
  //     <div>
  //       <img class="publi" src="${shuffledImages[0]}" alt="Publicidad 1" />
  //       <img class="publi" src="${shuffledImages[1]}" alt="Publicidad 2" />
  //     </div>
  //   `;

  //     // Insertar después del tercer párrafo
  //     thirdParagraph.insertAdjacentElement("afterend", cardElement);
  //   }
  //   if (paragraphs.length > 3) {
  //     const thirdParagraph = paragraphs[2]; // El tercer párrafo (índice 2)

  //     // Crear el componente con la primera imagen aleatoria
  //     const cardElement = document.createElement("div");
  //     cardElement.innerHTML = `
  //     <div>
  //       <img class="publi" src="${shuffledImages[0]}" alt="Publicidad 1" />
  //     </div>
  //   `;

  //     // Insertar después del tercer párrafo
  //     thirdParagraph.insertAdjacentElement("afterend", cardElement);
  //   }
  //   // Verificar si hay al menos cinco párrafos
  //   if (paragraphs.length >= 5) {
  //     const fifthParagraph = paragraphs[4]; // El quinto párrafo (índice 4)

  //     // Crear el componente con la segunda imagen aleatoria
  //     const cardElement = document.createElement("div");
  //     cardElement.innerHTML = `
  //     <div>
  //       <img class="publi" src="${shuffledImages[1]}" alt="Publicidad 2" />
  //     </div>
  //   `;

  //     // Insertar después del quinto párrafo
  //     fifthParagraph.insertAdjacentElement("afterend", cardElement);
  //   }

  //   // Retornar el HTML modificado
  //   return doc.body.innerHTML;
  // };

  const injectCardAfterThirdParagraph = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // URLs de las imágenes publicitarias
    const imageUrls = [
      "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg",
      "https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/centro-civico.jpg",
    ];
  
    // Mezclar aleatoriamente las imágenes publicitarias
    const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);
  
    // Seleccionar todos los párrafos
    const paragraphs = doc.querySelectorAll("p");
  
    // Función para insertar publicidad después de la imagen y su epígrafe (si existe)
    const insertAdAfterImageAndCaption = (paragraph, imageUrl) => {
      if (!paragraph) return;
  
      let nextElement = paragraph.nextElementSibling;
      let targetElement = paragraph; // Elemento donde se insertará la publicidad
  
      // Buscar la imagen y su epígrafe
      while (nextElement) {
        if (nextElement.tagName.toLowerCase() === "p" && nextElement.querySelector("img")) {
          let imageElement = nextElement;
          let captionElement = imageElement.nextElementSibling;
  
          // Si el siguiente elemento después de la imagen es un epígrafe (<p><em></em></p>)
          if (captionElement && captionElement.tagName.toLowerCase() === "p" && captionElement.querySelector("em")) {
            targetElement = captionElement; // Insertar después del epígrafe
          } else {
            targetElement = imageElement; // Insertar después de la imagen
          }
          break;
        }
        nextElement = nextElement.nextElementSibling;
      }
  
      // Crear el contenedor de publicidad
      const adElement = document.createElement("div");
      adElement.innerHTML = `
        <div style="margin-top: 16px; text-align: center;">
          <img class="publi" src="${imageUrl}" alt="Publicidad" style="max-width: 100%; border-radius: 8px;" />
        </div>
      `;
  
      // Insertar la publicidad en la posición correcta
      targetElement.insertAdjacentElement("afterend", adElement);
    };
  
    // Insertar la primera publicidad después del tercer párrafo
    if (paragraphs.length > 2) {
      insertAdAfterImageAndCaption(paragraphs[2], shuffledImages[0]);
    }
  
    // Insertar la segunda publicidad después del cuarto párrafo
    if (paragraphs.length > 3) {
      insertAdAfterImageAndCaption(paragraphs[3], shuffledImages[1]);
    }
  
    return doc.body.innerHTML;
  };
  
  
  

  // Insertar el contenido modificado
  const modifiedContent = injectCardAfterThirdParagraph(modifiedHtml);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component="div"
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
            margin-bottom: 4px;
          }
        * {
          color: white !important; 
          }
          em {
            color: grey;
            text-align: center;
            font-size: 12px;
          }
          p em, figcaption {
              display: block;
              margin-top: 1px; 
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
            margin-bottom: 4px;
          }

          * {
          color: white !important; 
          }

          figcaption {
            color: grey;
            text-align: center;
            margin-top: 8px;
            font-size: 12px;
          }

          em {
            color: grey;
            text-align: center;
            font-size: 12px;
          }

          p em, figcaption {
              display: block;
              margin-top: 2px; 
          }
        `}</style>
      )}
      <Box sx={{ mt: -2 }}>{renderContent(modifiedContent)}</Box>
      {newDetail.multimedia.length > 0 && !newDetail.isOld && (
        <Box
          sx={{
            padding: "0",
            margin: "0 auto",
            marginBottom: "8px",
            maxWidth: { xs: "300px", md: "800px" },
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
              maxHeight: "400px",
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
                      width: "80%",
                      height: "80%",
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
