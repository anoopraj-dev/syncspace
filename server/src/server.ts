import app from './app.js'
import env from './config/env.js'
import { connectDB } from './config/db.js'

async function initServer(){
    try {
        await connectDB();

        app.listen(env.PORT, ()=>{
            console.log(`Server listening on port ${env.PORT}`);
        })
    } catch (error) {
        console.error('Failed to start server',error);
        process.exit(1);
    }
}

initServer();