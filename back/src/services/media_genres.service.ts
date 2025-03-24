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
            "id_genre" = $3
          WHERE
            "id_media_genre" = $1
          RETURNING "email", "password"
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
}
