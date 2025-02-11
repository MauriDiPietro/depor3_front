import React, { useState, useEffect } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FaFacebook, FaLink, FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Fab, Box, Tooltip, Zoom } from "@mui/material";

interface ShareButtonsProps {
  id: string;
  isPatio: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ id, isPatio }) => {
  let originalUrl = '';
  if(isPatio) {
    originalUrl = `https://depor3-api.vercel.app/api/news/patio/${id}/meta`;
  } else {
    originalUrl = `https://depor3-api.vercel.app/api/news/${id}/meta`;
  }
  const BITLY_TOKEN = import.meta.env.VITE_BITLY_TOKEN; // Mejor usar .env

  const [shortUrl, setShortUrl] = useState(originalUrl);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Acortar el enlace al montar el componente
  useEffect(() => {
    const shortenUrl = async () => {
      if (!BITLY_TOKEN) {
        console.error("Falta el token de Bitly en las variables de entorno.");
        return;
      }
      try {
        const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BITLY_TOKEN}`,
          },
          body: JSON.stringify({ long_url: originalUrl }),
        });

        if (!response.ok) throw new Error("Error al acortar la URL");

        const data = await response.json();
        setShortUrl(data.link);
      } catch (error) {
        console.error("Error acortando URL:", error);
      }
    };

    shortenUrl();
  }, [originalUrl]);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(shortUrl).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 5000);
//     });
//   };

const handleCopyLink = async () => {
    let urlToCopy = shortUrl;
  
    // Si el shortUrl es el original, acortar primero antes de copiar
    if (shortUrl === originalUrl) {
      try {
        const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BITLY_TOKEN}`,
          },
          body: JSON.stringify({ long_url: originalUrl }),
        });
  
        if (!response.ok) throw new Error("Error al acortar la URL");
  
        const data = await response.json();
        urlToCopy = data.link; // Guardamos la URL acortada
        setShortUrl(data.link); // La actualizamos en el estado
      } catch (error) {
        console.error("Error acortando URL:", error);
        return; // Evitar copiar si hay error
      }
    }
  
    // Copiar la URL al portapapeles
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar el enlace:", error);
    }
  };

  const handleWhatsAppClick = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
        const whatsappUrl = isMobile
    ? `https://wa.me/?text=${encodeURIComponent(shortUrl)}`
    : `https://web.whatsapp.com/send?text=${encodeURIComponent(shortUrl)}`;
    //   const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
    //     shortUrl
    //   )}`;
      window.open(whatsappUrl, "_blank");
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Botón principal que despliega los demás */}
      <Fab color="primary" onClick={() => setExpanded(!expanded)}>
        <FaShareAlt size={24} color="white" />
      </Fab>

      {/* Botones de compartir que se muestran solo si expanded es true */}
      <Zoom in={expanded}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Tooltip title={copied ? "¡Enlace copiado!" : "Copiar enlace"} arrow>
            <Fab color="secondary" onClick={handleCopyLink}>
              <FaLink size={24} color="black" />
            </Fab>
          </Tooltip>

          <Fab color="success" onClick={handleWhatsAppClick}>
            <FaWhatsapp size={24} color="white" />
          </Fab>

          <FacebookShareButton url={shortUrl}>
            <Fab color="primary">
              <FaFacebook size={24} color="white" />
            </Fab>
          </FacebookShareButton>

          <TwitterShareButton url={shortUrl}>
            <Fab color="info">
              <FaTwitter size={24} color="white" />
            </Fab>
          </TwitterShareButton>
        </Box>
      </Zoom>
    </Box>
  );
};

export default ShareButtons;
