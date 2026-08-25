import TableCart from "../models/tableCart.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  try {
    await connectDB();

    const { tableId, coffeeId } = params;

    const cart = await TableCart.findOne({
      tableId,
    });

    if (!cart) {
      return Response.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item: any) => item.coffeeId.toString() === coffeeId,
    );

    if (!item) {
      return Response.json(
        { message: "Item not found in cart" },
        { status: 404 },
      );
    }

    if (item.qty > 1) {
      item.qty -= 1;
    }

    await cart.save();

    return Response.json({
      message: "Item quantity decreased",
      cart,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to remove item" }, { status: 500 });
  }
}
