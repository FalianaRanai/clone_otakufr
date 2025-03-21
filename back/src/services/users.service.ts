import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { hash } from 'bcrypt';
import { Service } from 'typedi';

const noms: string[] = ['Dupont', 'Martin', 'Bernard', 'Petit', 'Robert', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent'];
const prenoms = ['Lucas', 'Emma', 'Noah', 'Chloé', 'Hugo', 'Léa', 'Nathan', 'Sophie', 'Léo', 'Camille'];

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const { rows } = await pg.query(`
    SELECT
      *
    FROM
      users
    `);
    return rows;
  }

  public async findUserById(userId: number): Promise<User> {
    const { rows, rowCount } = await pg.query(
      `
    SELECT
      *
    FROM
      users
    WHERE
      id_user = $1
    `,
      [userId],
    );
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }

  public async createUser(userData: User): Promise<User> {
    const { email, password } = userData;

    const { rows } = await pg.query(
      `
    SELECT EXISTS(
      SELECT
        "email"
      FROM
        users
      WHERE
        "email" = $1
    )`,
      [email],
    );
    if (rows[0].exists) throw new HttpException(409, `This email ${email} already exists`);

    const hashedPassword = await hash(password, 10);
    const { rows: createUserData } = await pg.query(
      `
      INSERT INTO
        users(
          "email",
          "password"
        )
      VALUES ($1, $2)
      RETURNING "email", "password"
      `,
      [email, hashedPassword],
    );

    return createUserData[0];
  }

  public async updateUser(userId: number, userData: User): Promise<User[]> {
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "id_user"
        FROM
          users
        WHERE
          "id_user" = $1
      )`,
      [userId],
    );
    if (findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { email, password } = userData;
    const hashedPassword = await hash(password, 10);
    const { rows: updateUserData } = await pg.query(
      `
      UPDATE
        users
      SET
        "email" = $2,
        "password" = $3
      WHERE
        "id_user" = $1
      RETURNING "email", "password"
    `,
      [userId, email, hashedPassword],
    );

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "id_user"
        FROM
          users
        WHERE
          "id_user" = $1
      )`,
      [userId],
    );
    if (findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: deleteUserData } = await pg.query(
      `
      DELETE
      FROM
        users
      WHERE
        id_user = $1
      RETURNING "email", "password"
      `,
      [userId],
    );

    return deleteUserData;
  }

  public async generateUser(): Promise<User[]> {
    const users: User[] = [];
    const password = 'azerty';
    const hashedPassword = await hash(password, 10);
    try {
      await pg.query('BEGIN'); // Démarrage de la transaction

      for (let i = 0; i < noms.length; i++) {
        const email = `${prenoms[i]}_${noms[i]}@gmail.com`.toLowerCase();

        // Vérifier si l'email existe déjà
        const { rows } = await pg.query(`SELECT COUNT(*) FROM users WHERE email = $1`, [email]);

        if (parseInt(rows[0].count) > 0) {
          console.warn(`Email ${email} déjà existant, utilisateur ignoré.`);
          continue;
        }

        // Insérer l'utilisateur dans la transaction
        const { rows: createdUsers } = await pg.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email, password`, [
          email,
          hashedPassword,
        ]);

        users.push(createdUsers[0]); // Ajouter l'utilisateur à la liste
      }

      await pg.query('COMMIT'); // Validation de la transaction
    } catch (error) {
      await pg.query('ROLLBACK'); // Annulation en cas d'erreur
      console.error('Erreur lors de l’insertion des utilisateurs :', error);
      throw new HttpException(500, 'Erreur lors de la création des utilisateurs');
    }

    return users;
  }
}
