// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table user_roles {
  id_user_role integer
  id_user integer
  id_role integer
  created_at timestamp
  updated_at timestamp 
}

Table users {
  id_user integer [primary key]
  email varchar
  password varchar
  username varchar
  created_at timestamp
  updated_at timestamp
}

Table roles{
  id_role integer
  nom_role varchar
}

Table statuts{
  id_statut integer
  nom_statut varchar
}

Table saisons{
  id_saison integer
  nom_saison varchar
}

Table genres{
  id_genre integer
  nom_genre varchar
}

Table types{
  id_type integer
  nom_type varchar
}

Table realisateurs{
  id_realisateur integer
  nom_realisateur varchar
}

Table auteurs{
  id_auteur integer
  nom_auteur varchar
}

Table studios{
  id_studio integer
  nom_studio varchar
}

Table medias{
  id_media integer
  titre varchar
  sygnopsis text
  autre_nom varchar
  id_auteur integer
  id_realisateur integer
  id_studio integer
  id_type integer
  date_sortie timestamp
  duree integer
  id_statut integer
  affiche varchar
}

Table media_genres{
  id_media_genre integer
  id_media integer
  id_genre integer
}

Table episodes{
  id_episode integer
  date_sortie timestamp
  numero integer
  id_media integer
  nom_episode varchar
}

Ref user_roles: user_roles.id_user > users.id_user // many-to-one
Ref user_roles: user_roles.id_role > roles.id_role // many-to-one

Ref medias: medias.id_auteur < auteurs.id_auteur
Ref medias: medias.id_realisateur < realisateurs.id_realisateur
Ref medias: medias.id_studio < studios.id_studio
Ref medias: medias.id_statut < statuts.id_statut
Ref medias: medias.id_type < types.id_type

Ref meadia_genres: media_genres.id_media > medias.id_media
Ref meadia_genres: media_genres.id_media > genres.id_genre

Ref episodes: episodes.id_media > medias.id_media