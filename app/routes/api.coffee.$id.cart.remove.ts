import Coffee from "../models/coffee.server";
import { connectDB } from "../db.server";

export async function action({ params }: any) {
  await connectDB();

  const coffee = await Coffee.findOneAndUpdate(
    {
      _id: params.id,
      qty: { $gt: 0 },
    },
    {
      $inc: { qty: -1 },
    },
    {
      returnDocument: "after",
    },
  ).lean();

  if (!coffee) {
    return Response.json(
      { message: "Coffee not found or quantity is already 0" },
      { status: 404 },
    );
  }

  return Response.json({
    coffee: {
      ...coffee,
      _id: coffee._id.toString(),
    },
  });
}
