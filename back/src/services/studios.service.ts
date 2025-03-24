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
            "nom_studio" = $2
          WHERE
            "id_studio" = $1
          RETURNING "email", "password"
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
}
