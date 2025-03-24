import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { Routes } from './interfaces/routes.interface';
import { AuteurRoute } from './routes/auteurs.route';
import { GenreRoute } from './routes/genres.route';
import { MediaGenreRoute } from './routes/media_genres.route';
import { RealisateurRoute } from './routes/realisateurs.route';
import { RoleRoute } from './routes/roles.route';
import { StatutRoute } from './routes/statuts.route';
import { StudioRoute } from './routes/studios.route';
import { TypeRoute } from './routes/types.route';
import { UserRoleRoute } from './routes/user_roles.route';

ValidateEnv();

const routes: Routes[] = [
  new AuthRoute(),
  new UserRoute(),
  new RoleRoute(),
  new UserRoleRoute(),
  new GenreRoute(),
  new StatutRoute(),
  new TypeRoute(),
  new AuteurRoute(),
  new RealisateurRoute(),
  new StudioRoute(),
  new MediaGenreRoute(),
];

const app = new App(routes);

app.listen();
