export const normalizeDate = (dateStr: string | undefined): string | null => {
  if (!dateStr) return null;

  // Detectar formato m/dd/aaaa o dd/mm/aaaa
  const isMDY = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr);

  if (isMDY) {
    const [month, day, year] = dateStr.split("/");
    // Verificar si es un caso claro de m/dd/aaaa (día > 12 no tiene sentido como mes)
    if (parseInt(day) > 12) {
      return `${day}/${month}/${year}`; // Convertir a dd/mm/aaaa
    }
    return dateStr; // Dejarlo igual si ya es válido como dd/mm/aaaa
  }

  return dateStr; // Asumir que ya está en dd/mm/aaaa
};

export const parseDateToSort = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;

  const normalizedDate = normalizeDate(dateStr);
  if (!normalizedDate) return null;

  const [day, month, year] = normalizedDate.split("/");
  return new Date(`${year}-${month}-${day}`);
};
