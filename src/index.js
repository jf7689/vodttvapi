import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(usersRouter);

app.get("/", (req, res) => {
    res.status(200).send({ msg: "Hello" });
})

app.listen(PORT);