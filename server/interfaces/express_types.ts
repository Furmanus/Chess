import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';

export interface CustomRequest<T = {}, P extends core.Params = {}> extends Request<P> {
    body: T;
    session: Express.Session;
}
