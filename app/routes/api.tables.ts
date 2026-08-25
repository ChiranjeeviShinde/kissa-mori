import Table from "../models/table.server";
import { connectDB } from "../db.server";

export async function action({ request }: any) {
  try {
    await connectDB();

    const body = await request.json();

    const table = await Table.create({
      tableNumber: body.tableNumber ,
    });

    return Response.json(table);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to create table" },
      { status: 500 },
    );
  }
}
