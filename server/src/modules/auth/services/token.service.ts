import ms from "ms";
import env from "../../../config/env.js";
import { createSession,updateSessionRefreshTokenHash } from "../auth.repository.js";
import { generateAccessToken,generateRefreshToken } from "../../../utils/jwt.js";
import { hashToken } from "../../../utils/hash.js";

export async function issueAuthTokens (userId:string){

    const refreshTokenExpiresAt = new Date(
        Date.now()+ ms(env.JWT_REFRESH_EXPIRES_IN)
    )
    //create session
    const session = await createSession({

        user:userId,
        expiresAt: refreshTokenExpiresAt
        }
    );

    const accessToken = generateAccessToken({userId});
    const refreshToken = generateRefreshToken({userId,sessionId:session._id.toString()});

    const refreshTokenHash = hashToken(refreshToken);

    await updateSessionRefreshTokenHash(
        session._id.toString(),
        {
            refreshTokenHash,
            expiresAt: refreshTokenExpiresAt
        }
    );

    return {
        accessToken,
        refreshToken
    }
}