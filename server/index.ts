import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as socket from 'socket.io';
import {config} from 'dotenv';
config();
import {loginRouter} from './router/login_router';
import {rootDirectory} from './utils/path';
import {mainRouter} from './router/main_router';
import {databaseHelper} from './utils/database';
import {dashboardRouter} from './router/dashboard_router';
import * as expressSession from 'express-session';
import * as expressMySqlSession from 'express-mysql-session';
import * as sharedsession from 'express-socket.io-session';
import {sockerHelper} from './helpers/socket_helper';

const app = express();
const server = http.createServer(app);
const httpPort = process.env.NODE_ENV === 'development' ? 3000 : 80;
const httpsPort = process.env.NODE_ENV === 'production' ? 3001 : 443;
const MySqlStore =  expressMySqlSession(expressSession);
const sessionStore = new MySqlStore({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_BASENAME,
});
const session = expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
});
const io = socket(server);

io.use(sharedsession(session, {
    autoSave: true,
}));

app.set('views', path.resolve(rootDirectory, 'views'));
app.set('view engine', 'pug');

app.use('/dist', express.static('dist'));
app.use(express.json());
app.use(session);
app.use(mainRouter);
app.use(loginRouter);
app.use(dashboardRouter);

databaseHelper.sync().then(() => {
    console.log('Database synced');

    server.listen(httpPort, () => {
        console.log(`Server listening on port ${httpPort}`);
    });

    sockerHelper.initialize(io);
}).catch(err => {
    console.log(err);
});
