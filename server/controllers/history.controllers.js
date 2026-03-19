import { Event } from "../model/event.module.js";
export const historyController = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).select("_id name");
  res.json({ success: true, data: events });
};
