import React from "react";
import DOMPurify from "dompurify";
import { Box, Typography } from "@mui/material";

interface SanitizedHtmlProps {
  htmlContent: string;
}

export const SanitizedHtml: React.FC<SanitizedHtmlProps> = ({ htmlContent }) => {
  // Sanitize the HTML string
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        style={{
          overflowX: "hidden",
          textAlign: "left"
        }}
      />
        <style>{`
          img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
        `}</style>
    </Box>
  );
};
