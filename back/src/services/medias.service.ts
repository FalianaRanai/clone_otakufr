import { Media } from '@/interfaces/medias.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class MediaService {
  public async findAllMedia(): Promise<Media[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          medias
        `);
    return rows;
  }

  public async findMediaById(mediaId: number): Promise<Media> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          medias
        WHERE
          id_media = $1
        `,
      [mediaId],
    );
    if (!rowCount) throw new HttpException(409, "Media doesn't exist");

    return rows[0];
  }

  public async createMedia(mediaData: Media): Promise<Media> {
    const { titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche } = mediaData;

    const { rows: createMediaData } = await pg.query(
      `
          INSERT INTO
            medias(
              "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
            )
          VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)
          RETURNING "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
          `,
      [titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche],
    );

    return createMediaData[0];
  }

  public async updateMedia(mediaId: number, mediaData: Media): Promise<Media[]> {
    const { rows: findMedia } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media"
            FROM
              medias
            WHERE
              "id_media" = $1
          )`,
      [mediaId],
    );
    if (!findMedia[0].exists) throw new HttpException(409, "Media doesn't exist");

    const { titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche } = mediaData;
    const { rows: updateMediaData } = await pg.query(
      `
          UPDATE
            medias
          SET
            "titre"=$2,
            "sygnopsis"=$3,
            "autre_nom"=$4,
            "id_auteur"=$5,
            "id_realisateur"=$6,
            "id_studio"=$7,
            "date_sortie"=$8,
            "duree"=$9,
            "id_type"=$10,
            "id_statut"=$11,
            "affiche" = $12
          WHERE
            "id_media" = $1
          RETURNING "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
        `,
      [mediaId, titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche],
    );

    return updateMediaData;
  }

  public async deleteMedia(mediaId: number): Promise<Media[]> {
    const { rows: findMedia } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media"
            FROM
              medias
            WHERE
              "id_media" = $1
          )`,
      [mediaId],
    );
    if (!findMedia[0].exists) throw new HttpException(409, "Media doesn't exist");

    const { rows: deleteMediaData } = await pg.query(
      `
          DELETE
          FROM
            medias
          WHERE
            id_media = $1
          RETURNING "nom_media"
          `,
      [mediaId],
    );

    return deleteMediaData;
  }

  public async findMediaByIdJoin(mediaId: number): Promise<Media> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
            m.*, a.nom_auteur, r.nom_realisateur, s.nom_statut, t.nom_type, st.nom_studio
          FROM
            medias m
            JOIN
            auteurs a ON m.id_auteur = a.id_auteur
          JOIN
            realisateurs r ON m.id_realisateur = r.id_realisateur
          JOIN
            statuts s ON m.id_statut = s.id_statut
          JOIN
            types t ON m.id_type = t.id_type
          JOIN
            studios st ON m.id_studio = st.id_studio
          WHERE
            m.id_media = $1;
        `,
      [mediaId],
    );
    if (!rowCount) throw new HttpException(409, "Media doesn't exist");

    const retour = rows[0];

    const { rows: rows_genres, rowCount: rowCount_genres } = await pg.query(
      `
        SELECT * 
          FROM 
            genres g
          JOIN
            media_genres mg
            ON g.id_genre = mg.id_genre
          WHERE 
            mg.id_media = $1;
        `,
      [mediaId],
    );
    if (rowCount_genres) {
      retour.genres = rows_genres;
    }

    return retour;
  }
}
