import * as express from 'express';
import {Response} from 'express';
import {CustomRequest} from '../interfaces/express_types';
import {databaseHelper} from '../utils/database';
import {GameTableFields} from '../enums/database';

const router = express.Router();

router.get('/dashboard', (req: CustomRequest, res: Response) => {
    res.redirect('/dashboard/games');
});
router.get('/dashboard/games', dashboardRequestHandler);
router.get('/dashboard/settings', dashboardRequestHandler);
router.get('/dashboard/user_games', getUserGamesHandler);
router.post('/dashboard/user_games', createGameRequestHandler);
router.post('/logout', (req: CustomRequest, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

function dashboardRequestHandler(req: CustomRequest, res: Response): void {
    if (req.session.user) {
        res.render('app');
    } else {
        res.redirect('/login');
    }
}
async function createGameRequestHandler(req: CustomRequest, res: Response): Promise<void> {
    const {
        session,
    } = req;

    try {
        const gameData = await databaseHelper.createGame(session.user);
        const fullGameData = await databaseHelper.getGameByIdWithUsers(gameData[GameTableFields.ID]);
        const player1Data = fullGameData?.player1?.dataValues;

        res.status(200).send({
            ...gameData,
            player1Name: player1Data.login,
        });
    } catch(e) {
        console.error(e);
        res.status(500).end();
    }
}
async function getUserGamesHandler(req: CustomRequest, res: Response): Promise<void> {
    const {
        session
    } = req;
    const user = session?.user;

    if (user) {
        try {
            const games = await databaseHelper.getUserGames(user);

            res.status(200).send(games);
        } catch(e) {
            console.error(e);
            res.status(500).end();
        }
    } else {
        res.status(401).end();
    }
}

export {router as dashboardRouter};
