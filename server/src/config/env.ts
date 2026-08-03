import dotenv from 'dotenv';

dotenv.config();

const envVariables = [
    'PORT',
    'MONGODB_URI',
    'CLIENT_URL'
] as const;

for (const key of  envVariables){
    if(!process.env[key]){
        throw new Error(`Missing required environment variable:${key}`);
    }
}

const env = {
    PORT: Number(process.env.PORT),
    MONGODB_URI: process.env.MONGODB_URI!,
    CLIENT_URL: process.env.CLIENT_URL

}

export default env