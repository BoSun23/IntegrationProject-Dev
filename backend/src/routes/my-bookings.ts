import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel"; // Use the Hotel model to manage bookings


const router = express.Router();

// Route to fetch all bookings for the current user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    // Fetch hotels that contain bookings for the current user
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    }).lean(); // Convert to plain JavaScript objects

    // Map through the hotels and include hotel name in the bookings
    const bookingsWithHotelNames = hotels
      .map((hotel) => {
        const userBookings = hotel.bookings
          .filter((booking) => booking.userId === req.userId)
          .map((booking) => ({
            ...booking, // Spread booking fields
            hotelName: hotel.name, // Add the hotel name to each booking
          }));

        return userBookings;
      })
      .flat(); // Flatten to avoid nested arrays

    res.status(200).json(bookingsWithHotelNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

// Route to cancel a booking
router.delete("/:bookingId", verifyToken, async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  try {
    // Find the hotel that contains the booking
    const hotel = await Hotel.findOne({ "bookings._id": bookingId });

    if (!hotel) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Filter out the booking from the hotel's bookings array
    hotel.bookings = hotel.bookings.filter(
      (booking) => booking._id && booking._id.toString() !== bookingId
    );

    await hotel.save(); // Save the updated hotel document

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error canceling the booking" });
  }
});

export default router;
