import TableCart from "../models/tableCart.server";
import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  try {
    await connectDB();

    const tableId = params.tableId;

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
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Checkout failed" }, { status: 500 });
  }
}
