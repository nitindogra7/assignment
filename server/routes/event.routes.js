import express from "express";
import { eventController } from "../controllers/event.controllers.js";
import {
  historyController,
  getAllEvents,
} from "../controllers/history.controllers.js";

const router = express.Router();

router.post("/event", eventController);
router.get("/event/:id", historyController);
router.get("/history", getAllEvents);

export default router;
