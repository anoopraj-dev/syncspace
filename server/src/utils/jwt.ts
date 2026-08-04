import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { ApiError } from './ApiError.js';
import HTTP_STATUS from '../constants/http-status.js';

export interface AccessTokenPayload{
    userId:string
}

export interface RefreshTokenPayload extends AccessTokenPayload{
    sessionId: string,
}

export function generateAccessToken(payload: AccessTokenPayload){
    return jwt.sign(
        payload,
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN
        }
    )
}

export function generateRefreshToken(payload: RefreshTokenPayload){
    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN
        }
    )
}

export function verifyAccessToken( token: string):AccessTokenPayload{
    try {
        return jwt.verify(
            token,
            env.JWT_ACCESS_SECRET
        ) as AccessTokenPayload;
    } catch (error) {
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired access token')
    }
}

export function verifyRefreshToken( token: string ): RefreshTokenPayload {
    try {
        return jwt.verify(
            token,
            env.JWT_REFRESH_SECRET
        ) as RefreshTokenPayload
    } catch (error) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED,'Invalid or expired refresh token');
    }
}