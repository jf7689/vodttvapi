import { Router } from "express";
import { getUsers } from "../controllers/users.js";

const router = Router();

router.get("/api/users/:id", getUsers);

export default router;