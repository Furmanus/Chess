import * as express from 'express';

const router: express.Router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

export {router as loginRouter};