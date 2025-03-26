export interface Episode {
  id_episode?: number;
  nom_episode: string;
  numero: number;
  id_media: number;
  date_sortie: Date;

  // Am lay pagination
  affiche?: string;
}
