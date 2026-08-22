import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  await connectDB();

  const coffee = await Coffee.findByIdAndUpdate(
    params.id,
    { $inc: { qty: 1 } },
    { returnDocument: "after" },
  ).lean();

  if (!coffee) {
    return Response.json({ message: "Coffee not found" }, { status: 404 });
  }

  return Response.json({
    message: "Added to cart",
    coffee: {
      ...coffee,
      _id: coffee._id.toString(),
    },
  });
}
