import crypto from "crypto";

import TableCart from "../models/tableCart.server";
import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";
import { auth } from "../lib/auth.server";
import { razorpay } from "../utils/razorpay.server";

export async function action({ request }: any) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return Response.json(
        { message: "You must be logged in" },
        { status: 401 },
      );
    }

    const {
      tableId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await request.json();

    if (
      !tableId ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return Response.json(
        { message: "Invalid payment data" },
        { status: 400 },
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return Response.json(
        { message: "Payment verification failed" },
        { status: 400 },
      );
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured"
    ) {
      return Response.json(
        { message: "Payment was not captured" },
        { status: 400 },
      );
    }

    await connectDB();

    const cart = await TableCart.findOne({ tableId });

    if (!cart || cart.items.length === 0) {
      return Response.json({ message: "Cart is empty" }, { status: 400 });
    }

    for (const item of cart.items) {
      const coffee = await Coffee.findById(item.coffeeId);

      if (!coffee || coffee.stock < item.qty) {
        return Response.json(
          {
            message: `Not enough stock for ${item.name}`,
          },
          { status: 400 },
        );
      }
    }

    for (const item of cart.items) {
      await Coffee.findByIdAndUpdate(item.coffeeId, {
        $inc: {
          stock: -item.qty,
        },
      });
    }

    cart.items = [];

    await cart.save();

    return Response.json({
      success: true,
      message: "Payment successful and order placed",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Payment verification failed" },
      { status: 500 },
    );
  }
}
