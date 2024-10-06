import express, { Request, Response } from "express";
import Comment from "../models/Comment"; // Import the Comment model
import verifyToken from "../middleware/auth"; // Middleware to verify token

const router = express.Router();

// GET /api/comments/:hotelId - Fetch all comments for a hotel
router.get("/:hotelId", async (req: Request, res: Response) => {
  const { hotelId } = req.params;

  try {
    const comments = await Comment.find({ hotelId });
    if (!comments) {
      return res.status(404).json({ message: "No comments found for this hotel" });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST /api/comments - Add a comment for a hotel
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { hotelId, comment } = req.body;

  if (!hotelId || !comment) {
    return res.status(400).json({ message: "Hotel ID and comment are required" });
  }

  try {
    const newComment = new Comment({
      userId: req.userId, // userId comes from the token via verifyToken middleware
      hotelId,
      comment,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
