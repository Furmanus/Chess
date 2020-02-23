import {Sequelize, DataTypes, Model, BuildOptions} from 'sequelize';
import {DatabaseFieldsLengths} from '../enums/database';
import {Game} from './games';

export interface UserModel {
    readonly id: number;
    login: string;
    password: string;
}

export type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
}

let User: UserModelStatic;

function initialize(sequelize: Sequelize): void {
    User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        login: {
            type: DataTypes.STRING(DatabaseFieldsLengths.LOGIN_LENGTH),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(DatabaseFieldsLengths.PASSWORD_LENGTH),
            allowNull: false,
        },
    }) as UserModelStatic;
}

export {
    initialize as initializeUser,
    User,
};