import { Response } from "express";

export function setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
) {
    res.cookie(
        'accessToken',
        accessToken,
        {
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict'
        }
    );

    res.cookie(
        'refreshToken',
        refreshToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }
    )
}

export function clearAuthCookies( res: Response){
    res.clearCookie(
        'accessToken',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }
    );
    res.clearCookie(
        'refreshToken',
        {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict"
        }
    );
}