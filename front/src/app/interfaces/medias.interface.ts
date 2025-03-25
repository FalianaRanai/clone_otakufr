import { Genre } from "./genres.interface";

export interface Media {
  id_media?: number;
  titre: string;
  sygnopsis: string;
  autre_nom: string;
  id_auteur: number;
  id_realisateur: number;
  id_studio: number;
  date_sortie: Date;
  duree: string;
  id_type: number;
  id_statut: number;
  affiche: string;

  // POUR LES JOIN
  nom_auteur?: string;
  nom_realisateur?: string;
  nom_studio?: string;
  nom_type?: string;
  nom_statut?: string;
  genres?: Genre[];
}


