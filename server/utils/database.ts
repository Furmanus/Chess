import {Op, Sequelize} from 'sequelize';
import {initializeUser, User} from '../models/users';
import {Game, initializeGames} from '../models/games';
import {encrypt} from './crypto';
import {GameTableFields} from '../enums/database';
import {createInitialBoard} from '../../common/helpers/game_helper';
import {GameData, GameDataWithPlayerNames, UserData} from '../../common/interfaces/game_interfaces';

class DatabaseHelperClass {
    public sequelize: Sequelize;
    private UsersModel: typeof User;
    private GameModel: typeof Game;

    public constructor() {
        this.init();
    }
    public init(): void {
        this.initalizeSequelize();
        this.initializeModels();
        this.createRelations();
    }
    public authenticate(): Promise<void> {
        return this.sequelize.authenticate();
    }
    public sync(): Promise<void> {
        return this.sequelize.sync({force: false});
    }
    public createUser(login: string, password: string): Promise<{dataValues: {id: string; login: string, password: string}}> {
        return this.UsersModel.create({
            password: encrypt(password),
            login,
        });
    }
    public async getUserData(userId: number): Promise<UserData> {
        const userData = await this.UsersModel.findOne({
            attributes: ['login', 'id'],
            where: {
                id: userId,
            },
        });

        return userData.dataValues;
    }
    public async createGame(playerId: number): Promise<GameData> {
        const game = await this.GameModel.create({
            [GameTableFields.PLAYER1_ID]: playerId,
            [GameTableFields.ACTIVE_PLAYER]: playerId,
            [GameTableFields.GAME_STATE]: 'new',
            [GameTableFields.GAME_DATA]: createInitialBoard(),
            [GameTableFields.MOVES]: [],
        });

        return game.dataValues;
    }
    public getUserByName(name: string): Promise<{dataValues: {id: string; login: string, password: string}}> {
        return this.UsersModel.findOne({
            attributes: ['id', 'login', 'password'],
            where: {
                login: name,
            },
        });
    }
    public async getGameById(gameId: number): Promise<GameData> {
        const gameData = await Game.findOne({
            where: {
                id: gameId,
            },
        });

        return {
            ...gameData.dataValues,
        };
    }
    public async joinUserToGame(userId: number, gameId: number): Promise<GameData> {
        const gameData = await this.getGameById(gameId);

        if (gameData[GameTableFields.PLAYER2_ID] === null && gameData[GameTableFields.PLAYER1_ID] !== userId) {
            const update = await Game.update({
                [GameTableFields.PLAYER2_ID]: userId,
            }, {
                where: {
                    [GameTableFields.ID]: gameId,
                },
            });

            if (update[0] > 0) {
                const updatedGame = await this.getGameByIdWithUsers(gameId);

                return {
                    ...updatedGame.dataValues,
                    player1Name: updatedGame.player1?.dataValues?.login,
                    player2Name: updatedGame.player2?.dataValues?.login,
                };
            }
            throw new Error('Failed to update game data');
        }
        return null;
    }
    public getGameByIdWithUsers(gameId: number): any {
        return Game.findOne({
            where: {
                id: gameId,
            },
            include: ['player1', 'player2'],
        });
    }
    public async getUserGames(userId: number): Promise<GameDataWithPlayerNames[]> {
        const userGames = await Game.findAll({
            where: {
                [Op.or]: [
                    {[GameTableFields.PLAYER1_ID]: userId},
                    {[GameTableFields.PLAYER2_ID]: userId},
                ],
            },
            include: ['player1', 'player2'],
        });

        return userGames.map((game: any) => {
            return {
                ...game.dataValues,
                player1Name: game.player1?.dataValues?.login,
                player2Name: game.player2?.dataValues?.login,
            };
        });
    }
    public async getUserOrVacantGames(userId: number): Promise<GameDataWithPlayerNames[]> {
        const userGames = await Game.findAll({
            where: {
                [Op.or]: [
                    {[GameTableFields.PLAYER1_ID]: userId},
                    {[GameTableFields.PLAYER2_ID]: userId},
                    {[GameTableFields.PLAYER2_ID]: null},
                ]
            },
            include: ['player1', 'player2'],
        });

        return userGames.map((game: any) => ({
            ...game.dataValues,
            player1Name: game.player1?.dataValues?.login,
            player2Name: game.player2?.dataValues?.login,
        }));
    }
    private initalizeSequelize(): void {
        const {
            DATABASE_BASENAME,
            DATABASE_USERNAME,
            DATABASE_PASSWORD,
        } = process.env;

        this.sequelize = new Sequelize(DATABASE_BASENAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
            dialect: 'mysql',
        });
    }
    private initializeModels(): void {
        initializeUser(this.sequelize);
        initializeGames(this.sequelize);
        this.UsersModel = User;
        this.GameModel = Game;
    }
    private createRelations(): void {
        Game.belongsTo(User, {
            as: 'player1',
            foreignKey: {
                allowNull: false,
                name: 'player1_id',
            },
        });
        Game.belongsTo(User, {
            as: 'player2',
            foreignKey: 'player2_id',
        });
        User.hasMany(Game, {
            foreignKey: 'player1_id',
        });
        User.hasMany(Game, {
            foreignKey: 'player2_id',
        });
    }
}

export const databaseHelper = new DatabaseHelperClass();
