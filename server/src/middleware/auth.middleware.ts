import type {Request, Response,NextFunction} from 'express';
import { ApiError } from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.js';
import HTTP_STATUS from '../constants/http-status.js';

export function authenticate(req: Request,res: Response, next: NextFunction){
    try {
        const token = req.cookies?.accessToken;

        if(!token){
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED,'Token missing');
        }

        const decoded = verifyAccessToken(token);

        req.user = {
            userId: decoded.userId
        }

        next();
    } catch (error) {
        next(error)
    }
}