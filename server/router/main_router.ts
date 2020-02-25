import * as express from 'express';
import {CustomRequest} from '../interfaces/express_types';
import {Response} from 'express';
import {databaseHelper} from '../utils/database';

const router = express.Router();

router.get('/', (req: CustomRequest, res: Response) => {
    res.redirect('/login');
});
router.get('/user_data', async (req: CustomRequest, res: Response) => {
    const userId = req?.session?.user;

    if (userId) {
        try {
            const userData = await databaseHelper.getUserData(userId);

            res.status(200).send(userData);
        } catch(e) {
            res.status(500).end();
        }
    } else {
        res.status(400).end();
    }
});

export {router as mainRouter};