import { verifyRefreshToken, generateAccessToken,generateRefreshToken } from "../../../utils/jwt.js";
import { hashToken } from "../../../utils/hash.js";
import { ApiError } from "../../../utils/ApiError.js";
import HTTP_STATUS from "../../../constants/http-status.js";
import { findSessionById,updateSessionRefreshTokenHash } from "../auth.repository.js";
import ms from "ms";
import env from "../../../config/env.js";

export async function rotateRefreshToken( refreshToken: string){
    const decoded = verifyRefreshToken(refreshToken);

    const session = await findSessionById( decoded.sessionId);

    if(!session){
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED,'Session expired');
    };

    if(session.expiresAt < new Date()){
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Session expired');
    }

    const refreshTokenHash = hashToken(refreshToken);

    if(session.refreshTokenHash !== refreshTokenHash){
        throw new ApiError( HTTP_STATUS.UNAUTHORIZED, 'Invalid refresh token');
    }

    const newAccessToken = generateAccessToken({ userId: decoded.userId});

    const newRefreshToken = generateRefreshToken({ userId: decoded.userId, sessionId: session._id.toString()});

    const newExpiresAt = new Date ( Date.now()+ ms(env.JWT_REFRESH_EXPIRES_IN))

    //replace old token
    await updateSessionRefreshTokenHash(
        session._id.toString(),
        {
            refreshTokenHash: hashToken(newRefreshToken),
            expiresAt: newExpiresAt
        }
    );

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}