import { Type } from '@/interfaces/types.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

const types = ['Serie', 'Film', "Film d'animation"];

@Service()
export class TypeService {
  public async findAllType(): Promise<Type[]> {
    const { rows } = await pg.query(`
      SELECT
        *
      FROM
        types
      `);
    return rows;
  }

  public async findTypeById(typeId: number): Promise<Type> {
    const { rows, rowCount } = await pg.query(
      `
      SELECT
        *
      FROM
        types
      WHERE
        id_type = $1
      `,
      [typeId],
    );
    if (!rowCount) throw new HttpException(409, "Type doesn't exist");

    return rows[0];
  }

  public async createType(typeData: Type): Promise<Type> {
    const { nom_type } = typeData;

    const { rows: createTypeData } = await pg.query(
      `
        INSERT INTO
          types(
            "nom_type"
          )
        VALUES ($1)
        RETURNING "nom_type"
        `,
      [nom_type],
    );

    return createTypeData[0];
  }

  public async updateType(typeId: number, typeData: Type): Promise<Type[]> {
    const { rows: findType } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_type"
          FROM
            types
          WHERE
            "id_type" = $1
        )`,
      [typeId],
    );
    if (!findType[0].exists) throw new HttpException(409, "Type doesn't exist");

    const { nom_type } = typeData;
    const { rows: updateTypeData } = await pg.query(
      `
        UPDATE
          types
        SET
          "nom_type" = $2,
          "updated_at" = NOW()
        WHERE
          "id_type" = $1
        RETURNING "nom_type"
      `,
      [typeId, nom_type],
    );

    return updateTypeData;
  }

  public async deleteType(typeId: number): Promise<Type[]> {
    const { rows: findType } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_type"
          FROM
            types
          WHERE
            "id_type" = $1
        )`,
      [typeId],
    );
    if (!findType[0].exists) throw new HttpException(409, "Type doesn't exist");

    const { rows: deleteTypeData } = await pg.query(
      `
        DELETE
        FROM
          types
        WHERE
          id_type = $1
        RETURNING "nom_type"
        `,
      [typeId],
    );

    return deleteTypeData;
  }

  public async generateType(): Promise<Type[]> {
    const retour: Type[] = [];
    try {
      await pg.query('BEGIN');
      for (let i = 0; i < types.length; i++) {
        // Vérifier si le type existe déjà
        const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM types WHERE nom_type = $1`, [types[i]]);

        if (parseInt(rows_verif[0].count) > 0) {
          console.warn(`Type ${types[i]} déjà existant, type ignoré.`);
          continue;
        }

        const { rows } = await pg.query(
          `
            INSERT INTO
              types(
                "nom_type"
              )
            VALUES ($1)
            RETURNING "nom_type"
            `,
          [types[i]],
        );
        retour.push(rows[0]);
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des types :', error);
      throw new HttpException(500, 'Erreur lors de la création des types');
    }

    return retour;
  }
}
