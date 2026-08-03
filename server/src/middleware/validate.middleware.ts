import {Request, Response, NextFunction} from 'express';
import { ZodSchema } from 'zod';
import HTTP_STATUS from '../constants/http-status.js';

export function validate(schema: ZodSchema){
    return(
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.issues
            })
        }

        req.body = result.data;
        next();
    }
}