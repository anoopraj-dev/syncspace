import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { ApiError } from './ApiError.js';
import HTTP_STATUS from '../constants/http-status.js';

type JwtPayload = {
    userId: string;
}

export function generateAccessToken(userId: string){
    return jwt.sign(
        {userId},
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN
        }
    )
}

export function generateRefreshToken(userId: string){
    return jwt.sign(
        {userId},
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN
        }
    )
}

export function verifyAccessToken( token: string):JwtPayload{
    try {
        return jwt.verify(
            token,
            env.JWT_ACCESS_SECRET
        ) as JwtPayload;
    } catch (error) {
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired access token')
    }
}

export function verifyRefreshToken( token: string ): JwtPayload {
    try {
        return jwt.verify(
            token,
            env.JWT_REFRESH_SECRET
        ) as JwtPayload
    } catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED,'Invalid or expired refresh token');
    }
}