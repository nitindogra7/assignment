import { safeGenerateEvent } from "../services/event.services.js";
import { Event } from "../model/event.module.js";

export const eventController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "prompt can't be empty",
      });
    }

    const response = await safeGenerateEvent(prompt);
    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    const savedEvent = await Event.create({
      prompt,
      ...response,
    });

    return res.status(201).json({
      success: true,
      message: "generated and saved successfully",
      data: savedEvent,
    });
  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
