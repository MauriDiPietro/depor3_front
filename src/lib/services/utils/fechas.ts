export const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "Fecha no disponible";
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(date)); // "29/01/2025"
  };
  
