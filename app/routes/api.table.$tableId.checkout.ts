import TableCart from "../models/tableCart.server";
import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";
import { auth } from "../lib/auth.server";

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
    const userId = session.user.id;

    // console.log("Checkout user:", userId);
    // console.log("Checkout phone:", session.user.phoneNumber);

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
        $inc: { stock: -item.qty },
      });
    }

    cart.items = [];

    await cart.save();

    return Response.json({
      success: true,
      message: "Order placed successfully",
      userId,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Checkout failed" }, { status: 500 });
  }
}
