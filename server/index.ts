import * as express from 'express';
import * as path from 'path';
import {config} from 'dotenv';
config();
import {loginRouter} from './router/login_router';
import {rootDirectory} from './utils/path';
import {mainRouter} from './router/main_router';

const app = express();
const httpPort = process.env.NODE_ENV === 'development' ? 3000 : 80;
const httpsPort = process.env.NODE_ENV === 'production' ? 3001 : 443;

app.set('views', path.resolve(rootDirectory, 'views'));
app.set('view engine', 'pug');

app.use('/dist', express.static('dist'));
app.use(mainRouter);
app.use(loginRouter);

app.listen(httpPort, () => {
    console.log(`Server listening on port ${httpPort}`);
});