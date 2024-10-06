import mongoose, { Schema, Document } from "mongoose";

// Define the BookingType interface for TypeScript
export interface BookingType extends Document {
  hotelId: mongoose.Schema.Types.ObjectId;
  roomId: mongoose.Schema.Types.ObjectId;
  roomName: string;
  userId: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  createdAt: Date;
  paymentIntent?: string; // Add payment intent to store payment information
}

// Create a Mongoose schema for the Booking model
const bookingSchema = new mongoose.Schema<BookingType>({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Ensure auto-generated ID
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  roomName: { type: String, required: true },
  paymentIntent: { type: String, default: null }, // Add field for payment intent
});

// Create the Booking model
const Booking = mongoose.model<BookingType>("Booking", bookingSchema);

export default Booking;
