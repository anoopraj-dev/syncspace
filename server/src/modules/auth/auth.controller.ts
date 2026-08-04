import type { Request,Response, NextFunction } from "express"
import { getCurrentUserService, loginService, logoutAllService, logoutService, signupService } from "./services/auth.service.js";
import HTTP_STATUS from "../../constants/http-status.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookie.js";
import { ApiError } from "../../utils/ApiError.js";
import { rotateRefreshToken } from "./services/token-rotation.service.js";

//signup controller
export async function signupController ( req: Request, res: Response, next: NextFunction){
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
export async function getCurrentUserController(req: Request, res: Response, next: NextFunction){
    try {
        const user = await getCurrentUserService(req.user!.userId);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

//login controller
export async function loginController(req: Request,res: Response, next: NextFunction){
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

//token rotation

export async function rotateToken(req: Request, res: Response, next: NextFunction){
    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Refresh token missing');
        }

        const tokens = await rotateRefreshToken( refreshToken);

        setAuthCookies(
            res,
            tokens.accessToken,
            tokens.refreshToken
        )

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Token refreshed'
        })
    } catch (error) {
        next(error)
    }
}

//logout controller
export async function logoutController(req: Request,res: Response,next:NextFunction){
    try {
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            await logoutService(refreshToken);
        };

        clearAuthCookies(res);

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message: 'Logged out succesfully'
        })
    } catch (error) {
        next(error)
    }
}

//logout all devices
export async function logoutAllController(req: Request,res:Response,next:NextFunction){
    try {
        await logoutAllService(req.user!.userId);

        clearAuthCookies(res);

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:'Logged out from all devices'
        })
    } catch (error) {
        next(error)
    }
}