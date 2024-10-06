import { useParams, useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";

const PaymentForm = () => {
  const { bookingId } = useParams();  // Extract bookingId from URL params
  const location = useLocation();     // Extract state passed from previous page
  const totalCost = location.state?.totalCost;  // Get totalCost from the previous page

  console.log("Extracted bookingId:", bookingId);  // Log for debugging
  console.log("Extracted totalCost:", totalCost);  // Log for debugging

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Create a mutation to handle payment intent creation
  const createPaymentIntent = useMutation(apiClient.createPaymentIntent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await createPaymentIntent.mutateAsync({
        bookingId,  // Pass bookingId here
        totalCost,  // Pass totalCost here
      });

      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setPaymentError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        setPaymentSuccess(true);
      }

      setLoading(false);
    } catch (error) {
      setPaymentError("Failed to process payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment for Booking ID: {bookingId}</h1>
      <h2 className="text-xl font-semibold mb-4">Total Cost: ${totalCost}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
          <CardElement
            className="p-2 border border-gray-300 rounded"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {paymentError && <p className="text-red-600">{paymentError}</p>}
        {paymentSuccess && <p className="text-green-600">Payment successful!</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

