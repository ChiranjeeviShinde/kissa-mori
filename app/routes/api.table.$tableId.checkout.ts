import TableCart from "../models/tableCart.server";
import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";
import { auth } from "../lib/auth.server";
import { razorpay } from "../utils/razorpay.server";

export async function action({ request, params }: any) {
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

    await connectDB();

    const tableId = params.tableId;

    const cart = await TableCart.findOne({ tableId });

    if (!cart || cart.items.length === 0) {
      return Response.json({ message: "Cart is empty" }, { status: 400 });
    }

    let total = 0;

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

      total += item.price * item.qty;
    }

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "USD",
      receipt: `table_${tableId}_${Date.now()}`,
      notes: {
        tableId,
        userId: session.user.id,
      },
    });

    return Response.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to create payment order" },
      { status: 500 },
    );
  }
}
