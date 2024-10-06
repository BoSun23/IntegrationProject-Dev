import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { useState } from "react";
import * as apiClient from "../api-client"; // Import API client

const MyBookings = () => {
  const { data: bookings, refetch } = useQuery("fetchMyBookings", apiClient.fetchMyBookings); // Fetch bookings including hotelId
  const navigate = useNavigate(); // For redirection after submission
  const [rating, setRating] = useState<Record<string, number>>({});
  const [comment, setComment] = useState<Record<string, string>>({});

  const handleCancel = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      // Call API client for canceling booking (kept for other purposes)
      apiClient.cancelBooking(bookingId).then(refetch);
    }
  };

  const handlePayment = (bookingId: string, totalCost: number) => {
    navigate(`/payment/${bookingId}`, { state: { totalCost } });
  };

  const handleRatingChange = (hotelId: string, value: number) => {
    setRating((prev) => ({ ...prev, [hotelId]: value }));
  };

  const handleCommentChange = (hotelId: string, value: string) => {
    setComment((prev) => ({ ...prev, [hotelId]: value }));
  };

  const handleSubmitRatingAndComment = (hotelId: string) => {
    // Redirect to "Thanks for Feedback" page without backend call
    navigate("/thanks-for-feedback");
  };

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => {
        const isPast = new Date() > new Date(booking.checkIn);
        const isPaid = !!booking.paymentIntent;

        return (
          <div key={booking._id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{booking.hotelName}</h2>
            <p>Hotel ID: {booking.hotelId}</p> {/* Display hotelId */}
            <p>{booking.roomName}</p>
            <p>Check-in: {new Date(booking.checkIn).toDateString()}</p>
            <p>Check-out: {new Date(booking.checkOut).toDateString()}</p>
            <p>
              {booking.adultCount} adults, {booking.childCount} children
            </p>
            <p>Total: ${booking.totalCost}</p>

            {/* Payment or Paid label */}
            {!isPaid && !isPast ? (
              <button
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={() => handlePayment(booking._id, booking.totalCost)}
              >
                This booking is not paid yet, click to pay
              </button>
            ) : (
              <span className="mt-4 text-green-700 font-semibold">Paid</span>
            )}

            {/* Display cancel button if the booking is in the future */}
            {!isPast && (
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel Booking
              </button>
            )}

            {/* Rating and Comment Section (Visible when the booking is in the past) */}
            {isPast && (
              <div className="mt-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Rate your experience</label>
                  <select
                    value={rating[booking.hotelId] || ""}
                    onChange={(e) => handleRatingChange(booking.hotelId, parseInt(e.target.value, 10))}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select a rating
                    </option>
                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                      <option key={ratingValue} value={ratingValue}>
                        {ratingValue} Star{ratingValue > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Leave a comment</label>
                  <textarea
                    value={comment[booking.hotelId] || ""}
                    onChange={(e) => handleCommentChange(booking.hotelId, e.target.value)}
                    rows={3}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Write your comment here"
                  />
                </div>

                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={() => handleSubmitRatingAndComment(booking.hotelId)}
                >
                  Submit Rating & Comment
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
