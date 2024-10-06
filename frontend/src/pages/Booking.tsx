import { useQuery, useMutation } from "react-query";
import * as apiClient from "../api-client"; // API Client to make the POST request
import { useSearchContext } from "../contexts/SearchContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract selected room and price details from state
  const { selectedRoomId, selectedRoomName, pricePerNight } = location.state || {};
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // Fetch the hotel details
  const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId as string), {
    enabled: !!hotelId,
  });

  // Fetch current logged-in user data
  const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

  // Mutation for booking a hotel room
  const mutation = useMutation(apiClient.bookHotel, {
    onSuccess: () => {
      navigate("/my-bookings"); // Redirect to "My Bookings" page after success
    },
  });

  const handleConfirm = () => {
    if (currentUser && selectedRoomId && selectedRoomName) {
      // Create the booking payload with all necessary information
      const bookingPayload = {
        hotelId: hotelId as string, // Hotel ID
        roomId: selectedRoomId,     // Selected Room ID
        roomName: selectedRoomName, // Room Name
        checkIn: search.checkIn,    // Check-in Date
        checkOut: search.checkOut,  // Check-out Date
        adultCount: search.adultCount,  // Number of Adults
        childCount: search.childCount,  // Number of Children
        totalCost: pricePerNight * numberOfNights, // Total Cost
        firstName: currentUser.firstName, // First Name of the User
        lastName: currentUser.lastName,   // Last Name of the User
        email: currentUser.email,         // Email of the User
        hotelName: hotel?.name,           // Hotel Name
        hotelCity: hotel?.city,           // Hotel City
        hotelCountry: hotel?.country,     // Hotel Country
      };

      // Log booking payload to ensure all data is correct
      console.log("Booking Payload:", bookingPayload);

      // Trigger the mutation to make the POST request to the backend
      mutation.mutate(bookingPayload);
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      {/* Replace with your form and layout */}
      <div>
        <h2 className="text-xl font-bold">Your Booking Details</h2>
        <div>
          <p>Hotel: {hotel?.name}</p>
          <p>Location: {hotel?.city}, {hotel?.country}</p>
          <p>Selected Room: {selectedRoomName || "N/A"}</p>
          <p>Check-in: {search.checkIn?.toDateString()}</p>
          <p>Check-out: {search.checkOut?.toDateString()}</p>
          <p>Guests: {search.adultCount} Adults, {search.childCount} Children</p>
          <p>Price Per Night: ${pricePerNight}</p>
          <p>Total Cost: ${pricePerNight * numberOfNights}</p>
        </div>

        {/* Confirm and Edit buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Edit
          </button>
          <button
            onClick={handleConfirm} // Trigger booking confirm API call
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
