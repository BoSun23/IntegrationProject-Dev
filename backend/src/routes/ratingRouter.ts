import express, { Request, Response } from "express";
import Rating from "../models/Rating"; // Import the Rating model
import verifyToken from "../middleware/auth"; // Middleware to verify token

const router = express.Router();

// GET /api/ratings/:hotelId - Fetch all ratings for a hotel
router.get("/:hotelId", async (req: Request, res: Response) => {
  const { hotelId } = req.params;

  try {
    const ratings = await Rating.find({ hotelId });
    if (!ratings) {
      return res.status(404).json({ message: "No ratings found for this hotel" });
    }
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST /api/ratings - Add a rating for a hotel
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { hotelId, rating } = req.body;

  if (!hotelId || !rating) {
    return res.status(400).json({ message: "Hotel ID and rating are required" });
  }

  try {
    const newRating = new Rating({
      userId: req.userId, // userId comes from the token via verifyToken middleware
      hotelId,
      rating,
    });

    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
