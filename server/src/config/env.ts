import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();


const envVariables = [
    'PORT',
    'MONGODB_URI',
    'CLIENT_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_ACCESS_EXPIRES_IN',
    'JWT_REFRESH_EXPIRES_IN',
] as const;

for (const key of  envVariables){
    if(!process.env[key]){
        throw new Error(`Missing required environment variable:${key}`);
    }
}

const env = {
    PORT: Number(process.env.PORT),
    MONGODB_URI: process.env.MONGODB_URI!,
    CLIENT_URL: process.env.CLIENT_URL!,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

    JWT_ACCESS_EXPIRES_IN:
        (process.env.JWT_ACCESS_EXPIRES_IN ?? "15m") as StringValue,

    JWT_REFRESH_EXPIRES_IN:
        (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as StringValue,


}

export default env