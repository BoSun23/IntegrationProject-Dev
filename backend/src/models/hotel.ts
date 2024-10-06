import mongoose from "mongoose";
import { BookingType, HotelType,RatingType,CommentType } from "../shared/types";

// Define the rating and comment subdocuments
const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User who made the rating
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User who made the comment
  comment: { type: String, required: true }, // The comment text
  createdAt: { type: Date, default: Date.now },
});

// Booking schema (embedded in the hotel document)
const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  roomName: { type: String, required: true }, // Storing the selected room name
});

// Hotel schema
const hotelSchema = new mongoose.Schema<HotelType>({
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  isDeleted: { type: Boolean, default: false },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema], // Embedded bookings for each hotel

  // Add the ratings and comments arrays
  ratings: [ratingSchema], // Array of ratings for the hotel
  comments: [commentSchema], // Array of comments for the hotel
});

// Ensure the room references are valid
const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
