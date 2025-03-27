import { SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { Service } from 'typedi';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id_user };
  const expiresIn: number = 60 * 60;

  // const now = new Date();
  // console.log('Server current time:', now.toISOString()); // Heure actuelle du serveur en UTC
  // const expirationTime = new Date(now.getTime() + expiresIn * 1000); // Ajoute expiresIn en secondes
  // console.log('Expiration time:', expirationTime.toISOString()); // Heure d'expiration en UTC

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const { email, password } = userData;

    const { rows: findUser } = await pg.query(
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
    if (findUser[0].exists) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(password, 10);
    const { rows: signUpUserData } = await pg.query(
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

    return signUpUserData[0];
  }

  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    const { email, password, username } = userData;

    const { rows, rowCount } = await pg.query(
      `
      SELECT
        "id_user",
        "email",
        "password",
        "username"
      FROM
        users
      WHERE
        "email" = $1
      OR 
        "username" = $2
    `,
      [email, username],
    );
    if (!rowCount) throw new HttpException(409, `This email ${email} was not found`);

    const isPasswordMatching: boolean = await compare(password, rows[0].password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = createToken(rows[0]);
    const cookie = createCookie(tokenData);
    return { cookie, findUser: rows[0] };
  }

  public async logout(userData: User): Promise<User> {
    const { email, password } = userData;

    const { rows, rowCount } = await pg.query(
      `
    SELECT
        "email",
        "password"
      FROM
        users
      WHERE
        "email" = $1
      AND
        "password" = $2
    `,
      [email, password],
    );
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }

  public async checkValidationToken(token: string): Promise<any> {
    if (token) {
      const { id } = (await verify(token, SECRET_KEY)) as DataStoredInToken;

      const { rows, rowCount } = await pg.query(
        `
              SELECT
                "email",
                "password"
              FROM
                users
              WHERE
                "id_user" = $1
            `,
        [id],
      );

      if (rowCount) {
        return rows[0];
      }

      // VERIFIE SI LE TOKEN EST EXPIRER
      const decoded = jwtDecode(token);
      const now = new Date();
      const expire = new Date(decoded.exp * 1000);

      // return [now, expire, false];

      if (now >= expire) {
        return false;
      }
    }
    return false;
  }
}
