import { Request,Response, NextFunction } from "express"
import { getCurrentUserService, loginService, signupService } from "./auth.service.js";
import HTTP_STATUS from "../../constants/http-status.js";
import { setAuthCookies } from "../../utils/cookie.js";

//signup controller
export async function signup ( req: Request, res: Response, next: NextFunction){
    try {
        const result = await signupService(req.body);

        setAuthCookies(
            res,
            result.accessToken,
            result.refreshToken
        )

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'User registered successfully',
            data: result.user,
        })
    } catch (error) {
        next(error)
    }
}

//current user
export async function getCurrentUser(req: Request, res: Response, next: NextFunction){
    try {
        const user = await getCurrentUserService(req.user!.id);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

//login controller
export async function login(req: Request,res: Response, next: NextFunction){
    try {
        const result = await loginService(req.body);

        setAuthCookies(
            res,
            result.accessToken,
            result.refreshToken
        );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Login successful',
            data: result.user
        })
    } catch (error) {
        next(error)
    }
}