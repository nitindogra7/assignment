import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
    },
    cost: {
      type: Number,
    },

    perPerson: {
      type: Number,
    },

    days: {
      type: Number,
    },

    amenities: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Event = mongoose.model("Event", eventSchema);
