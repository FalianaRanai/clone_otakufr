import { Statut } from '@/interfaces/statuts.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

const statuts = ['En cours', 'Terminé'];

@Service()
export class StatutService {
  public async findAllStatut(): Promise<Statut[]> {
    const { rows } = await pg.query(`
      SELECT
        *
      FROM
        statuts
      `);
    return rows;
  }

  public async findStatutById(statutId: number): Promise<Statut> {
    const { rows, rowCount } = await pg.query(
      `
      SELECT
        *
      FROM
        statuts
      WHERE
        id_statut = $1
      `,
      [statutId],
    );
    if (!rowCount) throw new HttpException(409, "Statut doesn't exist");

    return rows[0];
  }

  public async createStatut(statutData: Statut): Promise<Statut> {
    const { nom_statut } = statutData;

    const { rows: createStatutData } = await pg.query(
      `
        INSERT INTO
          statuts(
            "nom_statut"
          )
        VALUES ($1)
        RETURNING "nom_statut"
        `,
      [nom_statut],
    );

    return createStatutData[0];
  }

  public async updateStatut(statutId: number, statutData: Statut): Promise<Statut[]> {
    const { rows: findStatut } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_statut"
          FROM
            statuts
          WHERE
            "id_statut" = $1
        )`,
      [statutId],
    );
    if (!findStatut[0].exists) throw new HttpException(409, "Statut doesn't exist");

    const { nom_statut } = statutData;
    const { rows: updateStatutData } = await pg.query(
      `
        UPDATE
          statuts
        SET
          "nom_statut" = $2,
          "updated_at" = NOW()
        WHERE
          "id_statut" = $1
        RETURNING "nom_statut"
      `,
      [statutId, nom_statut],
    );

    return updateStatutData;
  }

  public async deleteStatut(statutId: number): Promise<Statut[]> {
    const { rows: findStatut } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_statut"
          FROM
            statuts
          WHERE
            "id_statut" = $1
        )`,
      [statutId],
    );
    if (!findStatut[0].exists) throw new HttpException(409, "Statut doesn't exist");

    const { rows: deleteStatutData } = await pg.query(
      `
        DELETE
        FROM
          statuts
        WHERE
          id_statut = $1
        RETURNING "nom_statut"
        `,
      [statutId],
    );

    return deleteStatutData;
  }

  public async generateStatut(): Promise<Statut[]> {
    const retour: Statut[] = [];
    try {
      await pg.query('BEGIN');
      for (let i = 0; i < statuts.length; i++) {
        // Vérifier si le statut existe déjà
        const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM statuts WHERE nom_statut = $1`, [statuts[i]]);

        if (parseInt(rows_verif[0].count) > 0) {
          console.warn(`Statut ${statuts[i]} déjà existant, statut ignoré.`);
          continue;
        }

        const { rows } = await pg.query(
          `
            INSERT INTO
              statuts(
                "nom_statut"
              )
            VALUES ($1)
            RETURNING "nom_statut"
            `,
          [statuts[i]],
        );
        retour.push(rows[0]);
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des statuts :', error);
      throw new HttpException(500, 'Erreur lors de la création des statuts');
    }

    return retour;
  }

  public async getPagination(page: number, sample = 10): Promise<Statut[]> {
    const { rows } = await pg.query(
      `
            SELECT *
              FROM statuts 
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
              FROM statuts
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

  public async search(search: string, page = 1, sample = 10): Promise<Statut[]> {
    const { rows } = await pg.query(
      `
            SELECT
              *
            FROM
              statuts
            WHERE
              LOWER("nom_statut") LIKE LOWER($1)
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
              statuts
            WHERE
              LOWER("nom_statut") LIKE LOWER($1)
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
