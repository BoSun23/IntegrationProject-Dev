import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import Booking from "../models/booking";  // Assuming you use Mongoose or another ORM

const router = express.Router();

// Initialize Stripe instance with the API key from environment variables
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { bookingId, totalCost } = req.body;

  console.log("Received bookingId:", bookingId);  // Log for debugging
  console.log("Received totalCost:", totalCost);  // Log for debugging

  if (!bookingId || !totalCost) {
    console.error("Missing bookingId or totalCost");  // Add more descriptive error logs
    return res.status(400).json({ message: "Missing bookingId or totalCost" });
  }

  try {
    const amountInCents = Math.round(totalCost * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        bookingId,
      },
    });

    res.status(200).json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
