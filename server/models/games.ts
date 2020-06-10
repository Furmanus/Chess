import {GameStates} from '../../client/app/constants/app_games';
import {Sequelize, Model, BuildOptions, DataTypes} from 'sequelize';

export interface GameModel {
    readonly id: number;
    player1_id: number;
    player2_id: number;
    active_player: number;
    game_data: object;
    moves: object;
    game_state: GameStates;
    victorious_player_id: number;
}
export type GameModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): GameModel;
};

let Game: GameModelStatic;

function initialize(sequelize: Sequelize): void {
    Game = sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        active_player: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        game_data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        moves: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        game_state: {
            type: DataTypes.ENUM('new', 'active', 'finished'),
            allowNull: false,
        },
        victorious_player_id: {
            type: DataTypes.STRING(64),
        },
    }) as GameModelStatic;
}

export {
    initialize as initializeGames,
    Game,
};
