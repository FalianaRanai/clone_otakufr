import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { RoleRoute } from './routes/roles.route';
import { UserRoleRoute } from './routes/user_roles.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new RoleRoute(), new UserRoleRoute()]);

app.listen();
