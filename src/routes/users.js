import { Router } from "express";

const router = Router();

router.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).send({ msg: "Hello " + id });
})

export default router;