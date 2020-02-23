import {BaseError} from 'sequelize';
import {SequelizeErrors} from '../enums/database';

interface SequelizeLoginError {
    httpCode: number;
    errorCode: number;
}

export function getLoginErrorCodeFromSequelizeError(e: BaseError): SequelizeLoginError {
    switch (e.name) {
        case SequelizeErrors.DUPLICATE_ENTRY:
            return {
                errorCode: 1001,
                httpCode: 409,
            };
        default:
            return {
                errorCode: 500,
                httpCode: 500,
            };
    }
}