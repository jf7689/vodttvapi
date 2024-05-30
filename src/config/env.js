import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const envConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    dbUrl: process.env.DB_URL,
    dbKey: process.env.DB_KEY
}

export default envConfig;