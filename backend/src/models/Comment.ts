import mongoose, { Document, Schema } from 'mongoose';
import { CommentType } from '../shared/types';  // Import CommentType from shared types

// Define a CommentDocument interface that extends both CommentType and Mongoose's Document
interface CommentDocument extends CommentType, Document {
  // The _id and other document-specific fields will be automatically included by extending Document
}

// Define the comment schema
const commentSchema: Schema<CommentDocument> = new mongoose.Schema({
  userId: { type: String, required: true },        // User who made the comment
  comment: { type: String, required: true },       // The comment text
  createdAt: { type: Date, default: Date.now },    // Automatically set the creation date
});

// Create the Comment model
const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
