// room.ts (Create a separate model for Room)
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomName: { type: String, required: true },
    sleeps: { type: Number, required: true }, // Updated field
    pricePerNight: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: [{ type: String }], // Array of image URLs
    lastUpdated: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }, // For soft delete
  });

const Room = mongoose.model("Room", roomSchema);
export default Room;
