import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookRoutes from "./routes/book";
import roomRoutes from"./routes/room";
import bookingRoutes from "./routes/booking";
import myBookingsRouter from './routes/my-bookings';
import paymentRoutes from './routes/payments';
import ratingRouter from "./routes/ratingRouter";  // Import the rating router
import commentRouter from "./routes/commentRouter";  // Import the comment router

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/hotels", roomRoutes);
app.use("/api", roomRoutes);
app.use("/api/book", bookingRoutes);
app.use('/api/my-bookings', myBookingsRouter);
app.use('/api/payments', paymentRoutes);
app.use("/api/ratings", ratingRouter);  // Attach rating routes to /api/ratings
app.use("/api/comments", commentRouter);  // Attach comment routes to /api/comments

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(8000, () => {
  console.log("server running on localhost:8000");
});