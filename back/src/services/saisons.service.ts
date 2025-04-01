import { Saison } from '@/interfaces/saisons.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class SaisonService {
  public async findAllSaison(): Promise<Saison[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          saisons
        `);
    return rows;
  }

  public async findSaisonById(saisonId: number): Promise<Saison> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          saisons
        WHERE
          id_saison = $1
        `,
      [saisonId],
    );
    if (!rowCount) throw new HttpException(409, "Saison doesn't exist");

    return rows[0];
  }

  public async createSaison(saisonData: Saison): Promise<Saison> {
    const { id_media, numero } = saisonData;

    const { rows: createSaisonData } = await pg.query(
      `
          INSERT INTO
            saisons(
              "id_media",
              "numero"
            )
          VALUES ($1, $2)
          RETURNING "id_media", "numero"
          `,
      [id_media, numero],
    );

    return createSaisonData[0];
  }

  public async updateSaison(saisonId: number, saisonData: Saison): Promise<Saison[]> {
    const { rows: findSaison } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_saison"
            FROM
              saisons
            WHERE
              "id_saison" = $1
          )`,
      [saisonId],
    );
    if (!findSaison[0].exists) throw new HttpException(409, "Saison doesn't exist");

    const { id_media, numero } = saisonData;
    const { rows: updateSaisonData } = await pg.query(
      `
          UPDATE
            saisons
          SET
            "id_media" = $2,
            "numero" = $3,
            "updated_at" = NOW()
          WHERE
            "id_saison" = $1
          RETURNING "id_media", "numero"
        `,
      [saisonId, id_media, numero],
    );

    return updateSaisonData;
  }

  public async deleteSaison(saisonId: number): Promise<Saison[]> {
    const { rows: findSaison } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_saison"
            FROM
              saisons
            WHERE
              "id_saison" = $1
          )`,
      [saisonId],
    );
    if (!findSaison[0].exists) throw new HttpException(409, "Saison doesn't exist");

    const { rows: deleteSaisonData } = await pg.query(
      `
          DELETE
          FROM
            saisons
          WHERE
            id_saison = $1
          RETURNING "nom_saison"
          `,
      [saisonId],
    );

    return deleteSaisonData;
  }

  public async getPagination(page: number, sample = 10): Promise<Saison[]> {
    const { rows } = await pg.query(
      `
            SELECT *
              FROM saisons 
                LIMIT $1 OFFSET ($2 - 1) * $3
            ;
            `,
      [sample, page, sample],
    );

    return rows;
  }

  public async getCountPagination(sample = 10): Promise<any> {
    const { rows } = await pg.query(
      `
            SELECT COUNT(*) as count_pages
              FROM saisons
            ;
            `,
      [],
    );
    let nb_pages = Number(rows[0].count_pages / sample);
    // console.log(nb_pages, Math.trunc(nb_pages));
    if (nb_pages - Math.trunc(nb_pages) > 0) {
      nb_pages = Math.trunc(nb_pages) + 1;
    }

    return nb_pages;
  }

  public async search(search: string, page = 1, sample = 10): Promise<Saison[]> {
    const { rows } = await pg.query(
      `
            SELECT
              *
            FROM
              saisons
            WHERE
              LOWER("nom_saison") LIKE LOWER($1)
              LIMIT $2 OFFSET ($3 - 1) * $4
            `,
      [`%${search}%`, sample, page, sample],
    );
    return rows;
  }

  public async getCountPaginationSearch(search: string, sample = 10): Promise<any> {
    const { rows } = await pg.query(
      `
            SELECT
              COUNT(*) as count_pages
            FROM
              saisons
            WHERE
              LOWER("nom_saison") LIKE LOWER($1)
            `,
      [`%${search}%`],
    );

    let nb_pages = Number(rows[0].count_pages / sample);
    // console.log(nb_pages, Math.trunc(nb_pages));
    if (nb_pages - Math.trunc(nb_pages) > 0) {
      nb_pages = Math.trunc(nb_pages) + 1;
    }

    return nb_pages;
  }
}
