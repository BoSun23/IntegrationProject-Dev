export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type RatingType = {
  userId: string;    // User who made the rating
  rating: number;    // Rating value between 1 and 5
  createdAt: Date;   // When the rating was made
};

export type CommentType = {
  userId: string;    // User who made the comment
  comment: string;   // The actual comment text
  createdAt: Date;   // When the comment was made
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
  rooms: RoomType[];
  ratings: RatingType[];    // Add ratings array
  comments: CommentType[];  // Add comments array
  isDeleted: Boolean;
};

export type RoomType = {
  _id: string;
  hotelId: string;  // Reference to the hotel
  roomName: string;
  sleeps: number;   // Updated field
  pricePerNight: number;
  images: string[];  // Image URLs for the room
  available: boolean;  // Whether the room is available for booking
  lastUpdated: Date;
  isDeleted: boolean;  // Soft delete flag
};

export type BookingType = {
  _id?: string; // Optional because MongoDB will generate this
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roomName: string; // Add roomName to the BookingType
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export type EditProfileFormData = {
  firstName: string;
  lastName: string;
};
