import { Role } from '@/interfaces/roles.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { UserRole } from '@interfaces/user_roles.interface';
import { Service } from 'typedi';

@Service()
export class UserRoleService {
  public async findAllUserRole(): Promise<UserRole[]> {
    const { rows } = await pg.query(`
      SELECT
        *
      FROM
        user_roles
      `);
    return rows;
  }

  public async findUserRoleById(user_roleId: number): Promise<UserRole> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          user_roles
        WHERE
          id_user_role = $1
        `,
      [user_roleId],
    );
    if (!rowCount) throw new HttpException(409, "UserRole doesn't exist");

    return rows[0];
  }

  public async createUserRole(user_roleData: UserRole): Promise<UserRole> {
    const { id_user, id_role } = user_roleData;

    const { rows: createUserRoleData } = await pg.query(
      `
          INSERT INTO
            user_roles(
              "id_role", "id_user"
            )
          VALUES ($1, $2)
          RETURNING "id_role", "id_user"
          `,
      [id_role, id_user],
    );

    return createUserRoleData[0];
  }

  public async updateUserRole(user_roleId: number, user_roleData: UserRole): Promise<UserRole[]> {
    const { rows: findUserRole } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_user_role"
            FROM
              user_roles
            WHERE
              "id_user_role" = $1
          )`,
      [user_roleId],
    );
    if (!findUserRole[0].exists) throw new HttpException(409, "UserRole doesn't exist");

    const { id_user, id_role } = user_roleData;
    const { rows: updateUserRoleData } = await pg.query(
      `
          UPDATE
            user_roles
          SET
            "id_user" = $2,
            "id_role" = $3,
            "updated_at" = NOW()
          WHERE
            "id_user_role" = $1
          RETURNING "id_user", "id_role"
        `,
      [user_roleId, id_user, id_role],
    );

    return updateUserRoleData;
  }

  public async deleteUserRole(user_roleId: number): Promise<UserRole[]> {
    const { rows: findUserRole } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_user_role"
            FROM
              user_roles
            WHERE
              "id_user_role" = $1
          )`,
      [user_roleId],
    );
    if (!findUserRole[0].exists) throw new HttpException(409, "UserRole doesn't exist");

    const { rows: deleteUserRoleData } = await pg.query(
      `
          DELETE
          FROM
            user_roles
          WHERE
            id_user_role = $1
          RETURNING "id_user_role"
          `,
      [user_roleId],
    );

    return deleteUserRoleData;
  }

  public async generateUserRole(): Promise<UserRole[]> {
    const retour: UserRole[] = [];

    const { rows: roles } = await pg.query(`
      SELECT
        *
      FROM
        roles
      `);

    let role_admin: Role;
    let role_user: Role;

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nom_role === 'admin') {
        role_admin = roles[i];
      } else if (roles[i].nom_role === 'user') {
        role_user = roles[i];
      }
    }

    const { rows: users } = await pg.query(`
      SELECT
      *
      FROM
      users
      `);

    try {
      await pg.query('BEGIN');
      for (let i = 0; i < users.length; i++) {
        if (users[i].email.includes('admin')) {
          // Vérifier si l'email existe déjà
          const { rows } = await pg.query(`SELECT COUNT(*) FROM user_roles WHERE id_user = $1 AND id_role = $2`, [
            users[i].id_user,
            role_admin.id_role,
          ]);
          if (parseInt(rows[0].count) > 0) {
            console.warn(`UserRole ${users[i].email + role_admin.nom_role} déjà existant, utilisateur ignoré.`);
            continue;
          }

          // Insérer l'utilisateur dans la transaction
          const { rows: createdUsers } = await pg.query(`INSERT INTO user_roles ("id_role", "id_user") VALUES ($1, $2) RETURNING id_role, id_user`, [
            role_admin.id_role,
            users[i].id_user,
          ]);

          retour.push(createdUsers[0]); // Ajouter l'utilisateur à la liste
        } else {
          // Vérifier si l'email existe déjà
          const { rows } = await pg.query(`SELECT COUNT(*) FROM user_roles WHERE id_user = $1 AND id_role = $2`, [
            users[i].id_user,
            role_user.id_role,
          ]);
          if (parseInt(rows[0].count) > 0) {
            console.warn(`UserRole ${users[i].email + role_user.nom_role} déjà existant, utilisateur ignoré.`);
            continue;
          }

          // Insérer l'utilisateur dans la transaction
          const { rows: createdUsers } = await pg.query(`INSERT INTO user_roles ("id_role", "id_user") VALUES ($1, $2) RETURNING id_role, id_user`, [
            role_user.id_role,
            users[i].id_user,
          ]);

          retour.push(createdUsers[0]); // Ajouter l'utilisateur à la liste
        }
      }
      await pg.query('COMMIT');
    } catch (error) {
      await pg.query('ROLLBACK');
      throw new HttpException(409, 'Error while creating user roles');
    }

    return retour;
  }

  // Liste des user roles avec l'email des users et le nom des roles
  public async getListeUserRole(): Promise<UserRole[]> {
    const { rows } = await pg.query(`
      SELECT
        ur.*,
        u.email,
        r.nom_role
      FROM
        user_roles ur
      JOIN
        users u ON ur.id_user = u.id_user
      JOIN
        roles r ON ur.id_role = r.id_role
      `);
    return rows;
  }
}
