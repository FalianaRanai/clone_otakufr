import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { GenreRoute } from './routes/genres.route';
import { RoleRoute } from './routes/roles.route';
import { StatutRoute } from './routes/statuts.route';
import { TypeRoute } from './routes/types.route';
import { UserRoleRoute } from './routes/user_roles.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new RoleRoute(), new UserRoleRoute(), new GenreRoute(), new StatutRoute(), new TypeRoute()]);

app.listen();
