import TableCart from "../models/tableCart.server";
import { connectDB } from "../db.server";

export async function loader({ params }: any) {
  try {
    await connectDB();

    const cart = await TableCart.findOne({
      tableId: params.tableId,
    }).lean();

    if (!cart) {
      return Response.json({
        tableId: params.tableId,
        items: [],
      });
    }

    return Response.json({
      tableId: cart.tableId.toString(),
      items: cart.items.map((item: any) => ({
        coffeeId: item.coffeeId.toString(),
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to load cart" }, { status: 500 });
  }
}
