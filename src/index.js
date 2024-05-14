import * as dotenv from 'dotenv';
dotenv.config()

import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

const getCred = async () => {
    let cred = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    {
        method: "POST",
    });
    let res = await cred.json();
    console.log(res);
}

app.use(usersRouter);

app.get("/", (req, res) => {
    getCred()
    res.status(200).send({ msg: "Hello" });
})

app.listen(PORT);