import express from "express";
import { eventController } from "../controllers/event.controllers.js";

const router = express.Router();

router.post("/event", eventController);

export default router;