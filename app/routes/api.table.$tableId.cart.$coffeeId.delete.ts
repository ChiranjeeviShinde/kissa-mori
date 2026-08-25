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

    const itemExists = cart.items.some(
      (item: any) => item.coffeeId.toString() === coffeeId,
    );

    if (!itemExists) {
      return Response.json(
        { message: "Item not found in cart" },
        { status: 404 },
      );
    }

    cart.items = cart.items.filter(
      (item: any) => item.coffeeId.toString() !== coffeeId,
    );

    await cart.save();

    return Response.json({
      message: "Item deleted from cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to delete item" }, { status: 500 });
  }
}
