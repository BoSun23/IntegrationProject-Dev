import mongoose, { Document, Schema } from 'mongoose';
import { RatingType } from '../shared/types';  // Import RatingType from shared types

// Define a RatingDocument interface that extends both RatingType and Mongoose's Document
interface RatingDocument extends RatingType, Document {
  // The _id and other document-specific fields will be automatically included by extending Document
}

// Define the rating schema
const ratingSchema: Schema<RatingDocument> = new mongoose.Schema({
  userId: { type: String, required: true },          // User who made the rating
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating value (between 1 and 5)
  createdAt: { type: Date, default: Date.now },      // Automatically set the creation date
});

// Create the Rating model
const Rating = mongoose.model<RatingDocument>('Rating', ratingSchema);

export default Rating;
