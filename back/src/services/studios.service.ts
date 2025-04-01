import { Studio } from '@/interfaces/studios.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class StudioService {
  public async findAllStudio(): Promise<Studio[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          studios
        `);
    return rows;
  }

  public async findStudioById(studioId: number): Promise<Studio> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          studios
        WHERE
          id_studio = $1
        `,
      [studioId],
    );
    if (!rowCount) throw new HttpException(409, "Studio doesn't exist");

    return rows[0];
  }

  public async createStudio(studioData: Studio): Promise<Studio> {
    const { nom_studio } = studioData;

    const { rows: createStudioData } = await pg.query(
      `
          INSERT INTO
            studios(
              "nom_studio"
            )
          VALUES ($1)
          RETURNING "nom_studio"
          `,
      [nom_studio],
    );

    return createStudioData[0];
  }

  public async updateStudio(studioId: number, studioData: Studio): Promise<Studio[]> {
    const { rows: findStudio } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_studio"
            FROM
              studios
            WHERE
              "id_studio" = $1
          )`,
      [studioId],
    );
    if (!findStudio[0].exists) throw new HttpException(409, "Studio doesn't exist");

    const { nom_studio } = studioData;
    const { rows: updateStudioData } = await pg.query(
      `
          UPDATE
            studios
          SET
            "nom_studio" = $2,
            "updated_at" = NOW()
          WHERE
            "id_studio" = $1
          RETURNING "nom_studio"
        `,
      [studioId, nom_studio],
    );

    return updateStudioData;
  }

  public async deleteStudio(studioId: number): Promise<Studio[]> {
    const { rows: findStudio } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_studio"
            FROM
              studios
            WHERE
              "id_studio" = $1
          )`,
      [studioId],
    );
    if (!findStudio[0].exists) throw new HttpException(409, "Studio doesn't exist");

    const { rows: deleteStudioData } = await pg.query(
      `
          DELETE
          FROM
            studios
          WHERE
            id_studio = $1
          RETURNING "nom_studio"
          `,
      [studioId],
    );

    return deleteStudioData;
  }

  public async getPagination(page: number, sample = 10): Promise<Studio[]> {
    const { rows } = await pg.query(
      `
            SELECT *
              FROM studios 
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
              FROM studios
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

  public async search(search: string, page = 1, sample = 10): Promise<Studio[]> {
    const { rows } = await pg.query(
      `
            SELECT
              *
            FROM
              studios
            WHERE
              LOWER("nom_studio") LIKE LOWER($1)
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
              studios
            WHERE
              LOWER("nom_studio") LIKE LOWER($1)
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
