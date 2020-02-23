import * as express from 'express';
import * as path from 'path';
import {config} from 'dotenv';
config();
import {loginRouter} from './router/login_router';
import {rootDirectory} from './utils/path';
import {mainRouter} from './router/main_router';
import {databaseHelper} from './utils/database';
import {dashboardRouter} from './router/dashboard_router';
import * as expressSession from 'express-session';
import * as expressMySqlSession from 'express-mysql-session';
import {Game} from './models/games';
import {User} from './models/users';

const app = express();
const httpPort = process.env.NODE_ENV === 'development' ? 3000 : 80;
const httpsPort = process.env.NODE_ENV === 'production' ? 3001 : 443;
const MySqlStore =  expressMySqlSession(expressSession);
const sessionStore = new MySqlStore({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_BASENAME,
});

app.set('views', path.resolve(rootDirectory, 'views'));
app.set('view engine', 'pug');

app.use('/dist', express.static('dist'));
app.use(express.json());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));
app.use(mainRouter);
app.use(loginRouter);
app.use(dashboardRouter);

databaseHelper.sync().then(() => {
    console.log('Database synced');

    app.listen(httpPort, () => {
        console.log(`Server listening on port ${httpPort}`);
    });
}).catch(err => {
    console.log(err);
});
