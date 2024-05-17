import { Router } from "express";
import { getID } from "../controllers/users.js";

const router = Router();

router.get("/api/users/:name", getID);

export default router;