import { Genre } from '@/interfaces/genres.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

const genres = [
  'Action',
  'Aventure',
  'Comedie',
  'Crime',
  'Démons',
  'Drame',
  'Ecchi',
  'Espace',
  'Fantastique',
  'Gore',
  'Harem',
  'Historique',
  'Horreur',
  'Isekai',
  'Jeux',
  "L'école",
  'LGBT+',
  'Magical girls',
  'Magie',
  'Martial Arts',
  'Mecha',
  'Militaire',
  'Musique',
  'Mysterieux',
  'Parodie',
  'Police',
  'Psychologique',
  'Romance',
  'Samurai',
  'Sci-Fi',
  'Seinen',
  'Shoujo',
  'Shoujo Ai',
  'Shounen',
  'Shounen Ai',
  'Sport',
  'Super Power',
  'Surnaturel',
  'Suspense',
  'Thriller',
  'Tranche de vie',
  'Vampire',
];

@Service()
export class GenreService {
  public async findAllGenre(): Promise<Genre[]> {
    const { rows } = await pg.query(`
      SELECT
        *
      FROM
        genres
      `);
    return rows;
  }

  public async findGenreById(genreId: number): Promise<Genre> {
    const { rows, rowCount } = await pg.query(
      `
      SELECT
        *
      FROM
        genres
      WHERE
        id_genre = $1
      `,
      [genreId],
    );
    if (!rowCount) throw new HttpException(409, "Genre doesn't exist");

    return rows[0];
  }

  public async createGenre(genreData: Genre): Promise<Genre> {
    const { nom_genre } = genreData;

    const { rows: createGenreData } = await pg.query(
      `
        INSERT INTO
          genres(
            "nom_genre"
          )
        VALUES ($1)
        RETURNING "nom_genre"
        `,
      [nom_genre],
    );

    return createGenreData[0];
  }

  public async updateGenre(genreId: number, genreData: Genre): Promise<Genre[]> {
    const { rows: findGenre } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_genre"
          FROM
            genres
          WHERE
            "id_genre" = $1
        )`,
      [genreId],
    );
    if (!findGenre[0].exists) throw new HttpException(409, "Genre doesn't exist");

    const { nom_genre } = genreData;
    const { rows: updateGenreData } = await pg.query(
      `
        UPDATE
          genres
        SET
          "nom_genre" = $2
        WHERE
          "id_genre" = $1
        RETURNING "email", "password"
      `,
      [genreId, nom_genre],
    );

    return updateGenreData;
  }

  public async deleteGenre(genreId: number): Promise<Genre[]> {
    const { rows: findGenre } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_genre"
          FROM
            genres
          WHERE
            "id_genre" = $1
        )`,
      [genreId],
    );
    if (!findGenre[0].exists) throw new HttpException(409, "Genre doesn't exist");

    const { rows: deleteGenreData } = await pg.query(
      `
        DELETE
        FROM
          genres
        WHERE
          id_genre = $1
        RETURNING "nom_genre"
        `,
      [genreId],
    );

    return deleteGenreData;
  }

  public async generateGenre(): Promise<Genre[]> {
    const retour: Genre[] = [];
    try {
      await pg.query('BEGIN');
      for (let i = 0; i < genres.length; i++) {
        // Vérifier si le genre existe déjà
        const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM genres WHERE nom_genre = $1`, [genres[i]]);

        if (parseInt(rows_verif[0].count) > 0) {
          console.warn(`Genre ${genres[i]} déjà existant, genre ignoré.`);
          continue;
        }

        const { rows } = await pg.query(
          `
            INSERT INTO
              genres(
                "nom_genre"
              )
            VALUES ($1)
            RETURNING "nom_genre"
            `,
          [genres[i]],
        );
        retour.push(rows[0]);
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des genres :', error);
      throw new HttpException(500, 'Erreur lors de la création des genres');
    }

    return retour;
  }
}
