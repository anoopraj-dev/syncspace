import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js'

const app = express();

//Middlewares
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser())

//Routes

app.get('/error',()=>{
    throw new Error('Testing middleware')
});

app.use('/api/auth', authRoutes)

app.use(errorHandler)

export default app;