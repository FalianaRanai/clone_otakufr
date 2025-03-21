import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { RoleRoute } from './routes/roles.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new RoleRoute()]);

app.listen();
