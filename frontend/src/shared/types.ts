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
  };
  
  // shared/types.ts
export type BookingType = {
  _id:string ;
  hotelId: string;
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  totalCost: number;
  firstName: string;
  lastName: string;
  email: string;
};
