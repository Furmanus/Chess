import * as express from 'express';
import {CustomRequest} from '../interfaces/express_types';
import {Response} from 'express';

const router = express.Router();

router.get('/', (req: CustomRequest, res: Response) => {
    res.redirect('/login');
});

export {router as mainRouter};