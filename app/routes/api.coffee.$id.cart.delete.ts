import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  try {
    await connectDB();

    const coffee = await Coffee.findByIdAndUpdate(
      params.id,
      { $set: { qty: 0 } },
      { returnDocument: "after" },
    ).lean();

    if (!coffee) {
      return Response.json({ message: "Coffee not found" }, { status: 404 });
    }

    return Response.json({
      message: "Item removed from cart",
      coffee: {
        ...coffee,
        _id: coffee._id.toString(),
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Failed to remove item" }, { status: 500 });
  }
}
