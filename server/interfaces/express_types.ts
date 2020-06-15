import {Request} from 'express';
import * as core from 'express-serve-static-core';

export interface CustomRequest<T = Record<string, unknown>, P extends core.Params = core.Params> extends Request<P> {
    body: T;
    session: Express.Session;
}
