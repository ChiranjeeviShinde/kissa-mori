import type { Route } from "./+types/table.$id";
import { useLoaderData } from "react-router";

import { connectDB } from "../db.server";
import Table from "../models/table.server";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import CoffeeShop from "../../components/CoffeeShop";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_BUCKET_ACCESS_SECRET_KEY_ID!,
  },
});

async function getImage(key: string) {
  const command = new GetObjectCommand({
    Bucket: "kissa-mori",
    Key: key,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 1000,
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  await connectDB();

  const table = await Table.findById(params.id).lean();

  if (!table) {
    throw new Response("Table not found", {
      status: 404,
    });
  }

  const imageUrl = await getImage("coffee.jpg");
  const imageUrl2 = await getImage("coffee2.jpg");

  return {
    table: {
      _id: table._id.toString(),
      tableNumber: table.tableNumber,
    },
    imageUrl,
    imageUrl2,
  };
}

export default function TablePage() {
  const { table, imageUrl, imageUrl2 } = useLoaderData<typeof loader>();

  return (
    <CoffeeShop imageUrl={imageUrl} imageUrl2={imageUrl2} tableId={table._id} />
  );
}
