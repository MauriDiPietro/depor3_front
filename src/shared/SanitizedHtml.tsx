import React from "react";
import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";

interface SanitizedHtmlProps {
  htmlContent: string;
  category: string;
}

export const SanitizedHtml: React.FC<SanitizedHtmlProps> = ({
  htmlContent,
  category
}) => {
  // Sanitize the HTML string
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  // Función para insertar el componente después del primer párrafo
  const injectCardAfterFirstParagraph = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const firstParagraph = doc.querySelector("p");

    if (firstParagraph) {
      const cardElement = document.createElement("div");
      cardElement.innerHTML = `
        <div>
          <img class="publi"
            src="https://res.cloudinary.com/dsooxiydo/image/upload/v1737143687/capital-deportista.jpg"
            alt=""
          />
        </div>
      `;
      firstParagraph.insertAdjacentElement("afterend", cardElement);
    }

    return doc.body.innerHTML;
  };

  // Insertar el contenido modificado
  const modifiedContent = injectCardAfterFirstParagraph(sanitizedContent);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
        style={{
          overflowX: "hidden",
          textAlign: "left",
        }}
      />
      {category !== "Patio del deportista" ? (
        <style>{`
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
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

          img {
            width: auto;
            max-width: 100%;
            height: auto;
          }

          figcaption {
            color: grey;
            text-align: center;
            margin-top: 8px;
          }
        `}</style>
      )}
    </Box>
  );
};
