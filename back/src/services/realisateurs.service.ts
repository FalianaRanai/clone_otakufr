import { Realisateur } from '@/interfaces/realisateurs.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class RealisateurService {
  public async findAllRealisateur(): Promise<Realisateur[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          realisateurs
        `);
    return rows;
  }

  public async findRealisateurById(realisateurId: number): Promise<Realisateur> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          realisateurs
        WHERE
          id_realisateur = $1
        `,
      [realisateurId],
    );
    if (!rowCount) throw new HttpException(409, "Realisateur doesn't exist");

    return rows[0];
  }

  public async createRealisateur(realisateurData: Realisateur): Promise<Realisateur> {
    const { nom_realisateur } = realisateurData;

    const { rows: createRealisateurData } = await pg.query(
      `
          INSERT INTO
            realisateurs(
              "nom_realisateur"
            )
          VALUES ($1)
          RETURNING "nom_realisateur"
          `,
      [nom_realisateur],
    );

    return createRealisateurData[0];
  }

  public async updateRealisateur(realisateurId: number, realisateurData: Realisateur): Promise<Realisateur[]> {
    const { rows: findRealisateur } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_realisateur"
            FROM
              realisateurs
            WHERE
              "id_realisateur" = $1
          )`,
      [realisateurId],
    );
    if (!findRealisateur[0].exists) throw new HttpException(409, "Realisateur doesn't exist");

    const { nom_realisateur } = realisateurData;
    const { rows: updateRealisateurData } = await pg.query(
      `
          UPDATE
            realisateurs
          SET
            "nom_realisateur" = $2,
            "updated_at" = NOW()
          WHERE
            "id_realisateur" = $1
          RETURNING "nom_realisateur"
        `,
      [realisateurId, nom_realisateur],
    );

    return updateRealisateurData;
  }

  public async deleteRealisateur(realisateurId: number): Promise<Realisateur[]> {
    const { rows: findRealisateur } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_realisateur"
            FROM
              realisateurs
            WHERE
              "id_realisateur" = $1
          )`,
      [realisateurId],
    );
    if (!findRealisateur[0].exists) throw new HttpException(409, "Realisateur doesn't exist");

    const { rows: deleteRealisateurData } = await pg.query(
      `
          DELETE
          FROM
            realisateurs
          WHERE
            id_realisateur = $1
          RETURNING "nom_realisateur"
          `,
      [realisateurId],
    );

    return deleteRealisateurData;
  }
}
