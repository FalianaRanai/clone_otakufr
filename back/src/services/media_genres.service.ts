import { Genre } from '@/interfaces/genres.interface';
import { MediaGenre } from '@/interfaces/media_genres.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class MediaGenreService {
  public async findAllMediaGenre(): Promise<MediaGenre[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          media_genres
        `);
    return rows;
  }

  public async findMediaGenreById(media_genreId: number): Promise<MediaGenre> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          media_genres
        WHERE
          id_media_genre = $1
        `,
      [media_genreId],
    );
    if (!rowCount) throw new HttpException(409, "MediaGenre doesn't exist");

    return rows[0];
  }

  public async createMediaGenre(media_genreData: MediaGenre): Promise<MediaGenre> {
    const { id_media, id_genre } = media_genreData;

    const { rows: createMediaGenreData } = await pg.query(
      `
          INSERT INTO
            media_genres(
              "id_media",
              "id_genre"
            )
          VALUES ($1)
          RETURNING "id_media", "id_genre"
          `,
      [id_media, id_genre],
    );

    return createMediaGenreData[0];
  }

  public async updateMediaGenre(media_genreId: number, media_genreData: MediaGenre): Promise<MediaGenre[]> {
    const { rows: findMediaGenre } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media_genre"
            FROM
              media_genres
            WHERE
              "id_media_genre" = $1
          )`,
      [media_genreId],
    );
    if (!findMediaGenre[0].exists) throw new HttpException(409, "MediaGenre doesn't exist");

    const { id_media, id_genre } = media_genreData;
    const { rows: updateMediaGenreData } = await pg.query(
      `
          UPDATE
            media_genres
          SET
            "id_media" = $2,
            "id_genre" = $3,
            "updated_at" = NOW()
          WHERE
            "id_media_genre" = $1
          RETURNING "id_media", "id_genre"
        `,
      [media_genreId, id_media, id_genre],
    );

    return updateMediaGenreData;
  }

  public async deleteMediaGenre(media_genreId: number): Promise<MediaGenre[]> {
    const { rows: findMediaGenre } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media_genre"
            FROM
              media_genres
            WHERE
              "id_media_genre" = $1
          )`,
      [media_genreId],
    );
    if (!findMediaGenre[0].exists) throw new HttpException(409, "MediaGenre doesn't exist");

    const { rows: deleteMediaGenreData } = await pg.query(
      `
          DELETE
          FROM
            media_genres
          WHERE
            id_media_genre = $1
          RETURNING "nom_media_genre"
          `,
      [media_genreId],
    );

    return deleteMediaGenreData;
  }

  public async generate(): Promise<MediaGenre[]> {
    const media_genres = [];
    const genres_ref = ['Action', 'Aventure', 'Comedie', 'Démons', 'Ecchi', 'Fantastique', 'Isekai', 'Psychologique'];
    const genres: Genre[] = [];
    try {
      await pg.query('BEGIN');

      for (let i = 0; i < genres_ref.length; i++) {
        const { rows: rows_genres } = await pg.query(
          `
          SELECT
            *
          FROM
            genres
          WHERE 
            LOWER(nom_genre) LIKE LOWER('%' || $1 || '%')
          `,
          [genres_ref[i]],
        );
        genres.push(rows_genres[0]);
      }

      // console.log('rows_genre: ', genres);

      for (let i = 0; i < genres.length; i++) {
        // console.warn('HEIN?', genres[i]);
        // Vérifier si le genre existe déjà
        const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM media_genres WHERE id_media = $1 AND id_genre = $2`, [
          1,
          genres[i].id_genre,
        ]);

        if (parseInt(rows_verif[0].count) > 0) {
          console.warn(`Media_Genre ${genres[i].nom_genre} déjà existant, genre ignoré.`);
          continue;
        }

        // console.warn('AAAAAAAAAAAAAA?');

        const { rows: createMediaGenreData } = await pg.query(
          `
              INSERT INTO
                media_genres(
                  "id_media",
                  "id_genre"
                )
              VALUES ($1, $2)
              RETURNING "id_media", "id_genre"
              `,
          [1, genres[i].id_genre],
        );
        media_genres.push(createMediaGenreData[0]);
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des media genres :', error);
      throw new HttpException(500, 'Erreur lors de la création des media genres');
    }

    return media_genres;
  }
}
