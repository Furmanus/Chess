import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

export {router as mainRouter};