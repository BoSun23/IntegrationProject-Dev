import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Room from "../models/room";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Hotel from "../models/hotel";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Helper function for uploading images
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

// Add Room to Hotel
// Add Room to Hotel
router.post(
    "/:hotelId/rooms",
    verifyToken,
    upload.array("roomImages", 6),
    async (req: Request, res: Response) => {
      try {
        const hotelId = req.params.hotelId;
        const { roomName, sleeps, pricePerNight } = req.body;
  
        // Upload room images
        const roomImages = req.files ? await uploadImages(req.files as Express.Multer.File[]) : [];
  
        // Create a new Room object
        const newRoom = new Room({
          hotelId,
          roomName,
          sleeps: parseInt(sleeps),
          pricePerNight: parseFloat(pricePerNight),
          images: roomImages,
        });
  
        // Save the room to the Room collection
        const savedRoom = await newRoom.save();
  
        // Find the hotel by ID and push the room's ObjectId to the hotel's rooms array
        const hotel = await Hotel.findByIdAndUpdate(
          hotelId,
          { $push: { rooms: savedRoom._id } },  // Use the ObjectId of the saved room
          { new: true }
        );
  
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  
        res.status(201).json(hotel);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error adding room:", error.message); // Log the error message
          res.status(500).json({ message: "Error adding room", error: error.message });
        } else {
          console.error("Unknown error adding room:", error); // Handle unknown error type
          res.status(500).json({ message: "Error adding room", error: String(error) });
        }
      }
    }
  );
  
  router.get("/rooms/:roomId", async (req: Request, res: Response) => {
    try {
      const room = await Room.findOne({ _id: req.params.roomId, isDeleted: false });
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching room" });
    }
  });

  

// Update Room
router.put(
  "/rooms/:roomId",
  verifyToken,
  upload.array("roomImages", 6),
  async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;
      const updatedRoom = await Room.findById(roomId);

      if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

      updatedRoom.roomName = req.body.roomName || updatedRoom.roomName;
      updatedRoom.sleeps = req.body.sleeps || updatedRoom.sleeps;
      updatedRoom.pricePerNight = req.body.pricePerNight || updatedRoom.pricePerNight;

      // Upload new images if provided
      const newImages = req.files ? await uploadImages(req.files as Express.Multer.File[]) : [];
      updatedRoom.images = [...updatedRoom.images, ...newImages];

      updatedRoom.lastUpdated = new Date();
      await updatedRoom.save();
      res.status(200).json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating room" });
    }
  }
);

router.delete("/rooms/:roomId", verifyToken, async (req: Request, res: Response) => {
    const { roomId } = req.params;
    console.log(`Received request to delete room with ID: ${roomId}`);  // Add this
  
    try {
      const room = await Room.findByIdAndUpdate(
        roomId,
        { isDeleted: true },
        { new: true }
      );
  
      if (!room) {
        console.log(`Room with ID ${roomId} not found`); // Log if room is not found
        return res.status(404).json({ message: "Room not found" });
      }
  
      console.log(`Room with ID ${roomId} soft deleted`);  // Log success
      res.status(200).json({ message: "Room soft deleted successfully", room });
    } catch (error) {
      console.error(`Error deleting room:`, error);  // Log error
      res.status(500).json({ message: "Error deleting room", error });
    }
  });
export default router;
