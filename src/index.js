import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send({ msg: "Hello" });
})

app.get("/api/users/:id", (req, res) => {
    userID = req.params.id;
    res.status(200).send({ msg: "Hello" });
})

app.listen(PORT)