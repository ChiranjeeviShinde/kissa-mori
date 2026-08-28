import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";

export async function action({ request, params }: any) {
  try {
    await connectDB();

    const coffeeId = params.coffeeId;

    const body = await request.json();
    const quantity = Number(body.quantity);

    if (!quantity || quantity <= 0) {
      return Response.json(
        { message: "Invalid quantity" },
        { status: 400 },
      );
    }

    const coffee = await Coffee.findOneAndUpdate(
      {
        _id: coffeeId,
        stock: { $gte: quantity },
      },
      {
        $inc: { stock: -quantity },
      },
      {
        new: true,
      },
    );

    if (!coffee) {
      return Response.json(
        { message: "Not enough stock" },
        { status: 400 },
      );
    }

    return Response.json({
      success: true,
      stock: coffee.stock,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to update stock" },
      { status: 500 },
    );
  }
}