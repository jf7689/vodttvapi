import dotenv from "dotenv";
dotenv.config()

import { Twitch } from "./config/twitch.js";
import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

new Twitch();

const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    next();
};  

app.use(allowCrossDomain);
app.use(usersRouter);

app.get("/", (req, res) => {
    res.status(200).send({ msg: "API for VodTTV" });
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

export default app;