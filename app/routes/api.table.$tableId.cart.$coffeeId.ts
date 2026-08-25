import Coffee from "../models/coffee.server";
import TableCart from "../models/tableCart.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  try {
    await connectDB();

    const { tableId, coffeeId } = params;

    const coffee = await Coffee.findById(coffeeId).lean();

    if (!coffee) {
      return Response.json({ message: "Coffee not found" }, { status: 404 });
    }

    let cart = await TableCart.findOne({ tableId });

    if (!cart) {
      cart = await TableCart.create({
        tableId,
        items: [
          {
            coffeeId: coffee._id,
            name: coffee.name,
            price: coffee.price,
            qty: 1,
          },
        ],
      });
    } else {
      const item = cart.items.find(
        (item: any) => item.coffeeId.toString() === coffeeId,
      );

      if (item) {
        item.qty += 1;
      } else {
        cart.items.push({
          coffeeId: coffee._id,
          name: coffee.name,
          price: coffee.price,
          qty: 1,
        });
      }

      await cart.save();
    }

    return Response.json({
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}
