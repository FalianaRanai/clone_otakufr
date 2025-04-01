import { Auteur } from '@/interfaces/auteurs.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class AuteurService {
  public async findAllAuteur(): Promise<Auteur[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          auteurs
        `);
    return rows;
  }

  public async findAuteurById(auteurId: number): Promise<Auteur> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          auteurs
        WHERE
          id_auteur = $1
        `,
      [auteurId],
    );
    if (!rowCount) throw new HttpException(409, "Auteur doesn't exist");

    return rows[0];
  }

  public async createAuteur(auteurData: Auteur): Promise<Auteur> {
    const { nom_auteur } = auteurData;

    const { rows: createAuteurData } = await pg.query(
      `
          INSERT INTO
            auteurs(
              "nom_auteur"
            )
          VALUES ($1)
          RETURNING "nom_auteur"
          `,
      [nom_auteur],
    );

    return createAuteurData[0];
  }

  public async updateAuteur(auteurId: number, auteurData: Auteur): Promise<Auteur[]> {
    const { rows: findAuteur } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_auteur"
            FROM
              auteurs
            WHERE
              "id_auteur" = $1
          )`,
      [auteurId],
    );
    if (!findAuteur[0].exists) throw new HttpException(409, "Auteur doesn't exist");

    const { nom_auteur } = auteurData;
    const { rows: updateAuteurData } = await pg.query(
      `
          UPDATE
            auteurs
          SET
            "nom_auteur" = $2,
            "updated_at" = NOW()
          WHERE
            "id_auteur" = $1
          RETURNING "nom_auteur"
        `,
      [auteurId, nom_auteur],
    );

    return updateAuteurData;
  }

  public async deleteAuteur(auteurId: number): Promise<Auteur[]> {
    const { rows: findAuteur } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_auteur"
            FROM
              auteurs
            WHERE
              "id_auteur" = $1
          )`,
      [auteurId],
    );
    if (!findAuteur[0].exists) throw new HttpException(409, "Auteur doesn't exist");

    const { rows: deleteAuteurData } = await pg.query(
      `
          DELETE
          FROM
            auteurs
          WHERE
            id_auteur = $1
          RETURNING "nom_auteur"
          `,
      [auteurId],
    );

    return deleteAuteurData;
  }

  public async getPagination(page: number, sample = 10): Promise<Auteur[]> {
    const { rows } = await pg.query(
      `
            SELECT *
              FROM auteurs 
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
              FROM auteurs
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

  public async search(search: string, page = 1, sample = 10): Promise<Auteur[]> {
    const { rows } = await pg.query(
      `
            SELECT
              *
            FROM
              auteurs
            WHERE
              LOWER("nom_auteur") LIKE LOWER($1)
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
              auteurs
            WHERE
              LOWER("nom_auteur") LIKE LOWER($1)
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
