import { Router } from "express";
import { getID, getVods } from "../controllers/users.js";

const router = Router();

router.get("/api/users/:name", getID);
router.get("/api/users/vods/:userId", getVods);

export default router;