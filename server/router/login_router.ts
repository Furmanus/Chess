import * as express from 'express';
import {Response} from 'express';
import {CustomRequest} from '../interfaces/express_types';
import {databaseHelper} from '../utils/database';
import {compareString} from '../utils/crypto';
import {getLoginErrorCodeFromSequelizeError} from '../utils/errors';

interface PostLoginRequestBodyType {
    user: string;
    password: string;
}
interface RegisterRequestBodyType {
    user: string;
    password: string;
    repeatedPassword: string;
}

const router: express.Router = express.Router();

router.get('/login', (req: CustomRequest, res: Response) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});
router.post('/login', async (req: CustomRequest<PostLoginRequestBodyType>, res: Response) => {
    const {
        user,
        password,
    } = req.body;

    try {
        const foundUser = await databaseHelper.getUserByName(user);

        if (foundUser) {
            if (compareString(foundUser.dataValues.password, password)) {
                req.session.user = foundUser.dataValues.id;
                req.session.userName = foundUser.dataValues.login;

                res.status(200).end();
            } else {
                res.status(403).send({
                    errorCode: 1003,
                });
            }
        } else {
            res.status(403).send({
                errorCode: 1002,
            });
        }
    } catch (e) {
        const errorObject = getLoginErrorCodeFromSequelizeError(e);

        res.status(errorObject.httpCode).send({
            errorCode: errorObject.errorCode,
        });
    }
});
router.post('/register', async (req: CustomRequest<RegisterRequestBodyType>, res: Response) => {
    const {
        user,
        password,
        repeatedPassword,
    } = req.body;

    if (password === repeatedPassword) {
        try {
            const createdUser = await databaseHelper.createUser(user, password);

            req.session.user = createdUser.dataValues.id;
            req.session.userName = createdUser.dataValues.login;
            res.status(202).end();
        } catch (e) {
            const errorObject = getLoginErrorCodeFromSequelizeError(e);

            res.status(errorObject.httpCode).send({
                errorCode: errorObject.errorCode,
            });
        }
    } else {
        res.status(422).send({errorCode: 1000});
    }
});

export {router as loginRouter};
