import {Request, Response} from 'express';

export interface CustomRequest<T = {}> extends Request {
    body: T;
    session: Express.Session;
}
