import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import Room from "../models/room";
import { BookingType } from "../shared/types";

const router = express.Router();

// POST route to handle hotel booking
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { hotelId, roomId, roomName, checkIn, checkOut, adultCount, childCount, totalCost } = req.body;

  try {
    // Find the hotel and the room
    const hotel = await Hotel.findById(hotelId);
    const room = await Room.findById(roomId);

    if (!hotel || !room) {
      return res.status(404).json({ message: "Hotel or Room not found" });
    }

    // Verify that the room belongs to the hotel
    const roomBelongsToHotel = hotel.rooms.includes(roomId);
    if (!roomBelongsToHotel) {
      return res.status(400).json({ message: "Room does not belong to this hotel" });
    }

    // Validate the check-in and check-out dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: "Check-in date must be before check-out date" });
    }

    // Create the new booking object
    const newBooking: BookingType = {
      userId: req.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roomName,
      adultCount,
      childCount,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalCost,
    };

    // Add the booking to the hotel's bookings array
    hotel.bookings.push(newBooking);
    await hotel.save();

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

export default router;
