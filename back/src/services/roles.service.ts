import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Role } from '@interfaces/roles.interface';
import { Service } from 'typedi';

@Service()
export class RoleService {
  public async findAllRole(): Promise<Role[]> {
    const { rows } = await pg.query(`
      SELECT
        *
      FROM
        roles
      `);
    return rows;
  }

  public async findRoleById(roleId: number): Promise<Role> {
    const { rows, rowCount } = await pg.query(
      `
      SELECT
        *
      FROM
        roles
      WHERE
        id_role = $1
      `,
      [roleId],
    );
    if (!rowCount) throw new HttpException(409, "Role doesn't exist");

    return rows[0];
  }

  public async createRole(roleData: Role): Promise<Role> {
    const { nom_role } = roleData;

    const { rows: createRoleData } = await pg.query(
      `
        INSERT INTO
          roles(
            "nom_role"
          )
        VALUES ($1)
        RETURNING "nom_role"
        `,
      [nom_role],
    );

    return createRoleData[0];
  }

  public async updateRole(roleId: number, roleData: Role): Promise<Role[]> {
    const { rows: findRole } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_role"
          FROM
            roles
          WHERE
            "id_role" = $1
        )`,
      [roleId],
    );
    if (!findRole[0].exists) throw new HttpException(409, "Role doesn't exist");

    const { nom_role } = roleData;
    const { rows: updateRoleData } = await pg.query(
      `
        UPDATE
          roles
        SET
          "nom_role" = $2
        WHERE
          "id_role" = $1
        RETURNING "email", "password"
      `,
      [roleId, nom_role],
    );

    return updateRoleData;
  }

  public async deleteRole(roleId: number): Promise<Role[]> {
    const { rows: findRole } = await pg.query(
      `
        SELECT EXISTS(
          SELECT
            "id_role"
          FROM
            roles
          WHERE
            "id_role" = $1
        )`,
      [roleId],
    );
    if (!findRole[0].exists) throw new HttpException(409, "Role doesn't exist");

    const { rows: deleteRoleData } = await pg.query(
      `
        DELETE
        FROM
          roles
        WHERE
          id_role = $1
        RETURNING "nom_role"
        `,
      [roleId],
    );

    return deleteRoleData;
  }

  public async generateRole(): Promise<Role[]> {
    const roles = ['admin', 'user', 'moderator'];
    const retour: Role[] = [];
    try {
      await pg.query('BEGIN');
      for (let i = 0; i < roles.length; i++) {
        // Vérifier si le role existe déjà
        const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM roles WHERE nom_role = $1`, [roles[i]]);

        if (parseInt(rows_verif[0].count) > 0) {
          console.warn(`Role ${roles[i]} déjà existant, role ignoré.`);
          continue;
        }

        const { rows } = await pg.query(
          `
            INSERT INTO
              roles(
                "nom_role"
              )
            VALUES ($1)
            RETURNING "nom_role"
            `,
          [roles[i]],
        );
        retour.push(rows[0]);
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des roles :', error);
      throw new HttpException(500, 'Erreur lors de la création des roles');
    }

    return retour;
  }
}
