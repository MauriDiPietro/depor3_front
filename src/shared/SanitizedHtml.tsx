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

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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
            max-width: 60%;
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
