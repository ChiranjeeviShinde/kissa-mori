import type { Route } from "./+types/table.$id";
import { useLoaderData } from "react-router";

import { connectDB } from "../db.server";
import Table from "../models/table.server";
import CoffeeShop from "../../components/CoffeeShop";

import { getCoffeeImages } from "../utils/s3.server";

export async function loader({ params }: Route.LoaderArgs) {
  await connectDB();

  const table = await Table.findById(params.id).lean();

  if (!table) {
    throw new Response("Table not found", {
      status: 404,
    });
  }

  const images = await getCoffeeImages();

  return {
    table: {
      _id: table._id.toString(),
      tableNumber: table.tableNumber,
    },
    images,
  };
}

export default function TablePage() {
  const { table, images } = useLoaderData<typeof loader>();

  return <CoffeeShop images={images} tableId={table._id} />;
}
