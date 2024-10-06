import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  EditProfileFormData,
  HotelSearchResponse,
  HotelType,
  UserType,
} from "../../backend/src/shared/types";



import { BookingFormData } from "./forms/BookingForm/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

// export const validateToken = async () => {
//   const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Token invalid");
//   }

//   return response.json();
// };

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const data = await response.json();

  console.log("Token validation response:", data);  // Log the API response

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return data;  // Ensure this contains the role
};



export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};





export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};



export const fetchMyBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return response.json();
};


export const updateProfile = async (formData: EditProfileFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me/update`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to update profile");
  }

  return responseBody;
};

export const addRoomToHotel = async (hotelId: string, roomFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/rooms`, {
    method: "POST",
    credentials: "include",
    body: roomFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add room");
  }

  return response.json();
};

export const fetchRoomById = async (roomId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching room details");
  }

  return response.json();
};

export const updateRoom = async (roomId: string, roomData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
    method: "PUT",
    credentials: "include",
    body: roomData,
  });

  if (!response.ok) {
    throw new Error("Error updating room");
  }

  return response.json();
};

export const resetPassword = async (formData: { password: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/users/reset-password`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to reset password");
  }

  return responseBody;
};



export const softDeleteHotel = async (hotelId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete hotel");
  }

  return response.json();
};

export const softDeleteRoom = async (roomId: string) => {
  const url = `${API_BASE_URL}/api/rooms/${roomId}`;
  console.log(`Sending DELETE request to: ${url}`);
  const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete room");
  }

  return response.json();
};
export const cancelBooking = async (bookingId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings/${bookingId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to cancel booking");
  }

  return response.json();
};

export const bookHotel = async (bookingData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/book/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Failed to book hotel");
  }

  return response.json();
};
export const createPaymentIntent = async ({ bookingId, totalCost }: { bookingId: string; totalCost: number }) => {
  try {
    console.log("Creating payment intent with:", { bookingId, totalCost });  // Debugging log
    const response = await fetch(`${API_BASE_URL}/api/payments/create-payment-intent`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
        totalCost,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();  // Retrieve error text from the response
      throw new Error(`Failed to create payment intent: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);  // Log the error for debugging
    throw error;
  }
};




export const submitRatingAndComment = async ({ hotelId, ratingValue, commentText }: { hotelId: string, ratingValue: number, commentText: string }) => {
  const response = await fetch(`/api/hotels/${hotelId}/rate-comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ratingValue, commentText }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit rating and comment");
  }

  return response.json();
};

// api-client.ts

export const fetchHotelRating = async (hotelId: string) => {
  const response = await fetch(`http://localhost:8000/api/ratings/${hotelId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch hotel rating");
  }
  const ratings = await response.json();
  
  // Return the first rating if available, otherwise return null
  return ratings.length > 0 ? ratings[0].rating : null;
};
export const fetchHotelComments = async (hotelId: string) => {
  const response = await fetch(`http://localhost:8000/api/comments/${hotelId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch hotel comments");
  }
  const comments = await response.json();

  // Return the comments array or an empty array if none are found
  return comments.length > 0 ? comments : [];
};






