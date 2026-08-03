import { Request,Response, NextFunction } from "express"
import { signupService } from "./auth.service.js";
import HTTP_STATUS from "../../constants/http-status.js";

export async function signup ( req: Request, res: Response, next: NextFunction){
    try {
        const user = await signupService(req.body);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}