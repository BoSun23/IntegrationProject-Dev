import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Booking from "../models/booking";
import Hotel from "../models/hotel";
import Room from "../models/room";

const router = express.Router();

// POST route to handle creating a new booking
router.post("/book", verifyToken, async (req: Request, res: Response) => {
  const { hotelId, roomId, roomName, checkIn, checkOut, adultCount, childCount, totalCost } = req.body;

  try {
    // Ensure that the hotel and room exist
    const hotel = await Hotel.findById(hotelId);
    const room = await Room.findById(roomId);

    if (!hotel || !room) {
      return res.status(404).json({ message: "Hotel or Room not found" });
    }

    // Create the booking data
    const newBooking = new Booking({
      hotelId,
      roomId,
      roomName,
      userId: req.userId, // From verifyToken middleware
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      adultCount,
      childCount,
      checkIn,
      checkOut,
      totalCost,
    });

    // Save the booking in the database
    await newBooking.save();

    // Return the successful response
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

// GET route to fetch all bookings for the logged-in user
router.get("/my-bookings", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    // Fetch all hotels with bookings for this user
    const hotels = await Hotel.find({
      "bookings.userId": userId,
    });

    // Extract bookings for this user from the hotels
    const bookings = hotels.flatMap(hotel => hotel.bookings.filter(booking => booking.userId === userId));

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});


export default router;
