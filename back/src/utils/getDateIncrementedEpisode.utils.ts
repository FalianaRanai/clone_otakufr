export const getDateIncremented = (date_sortie, j) => {
  // 1. Convertir la chaîne en objet Date
  const date = new Date(date_sortie);

  // 2. Ajouter (j-1)*7 jours (car j=1 → +0, j=2 → +7, etc.)
  date.setDate(date.getDate() + (j - 1) * 7);

  // 3. Reformatage en "YYYY/MM/DD"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois 0-indexé
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};
