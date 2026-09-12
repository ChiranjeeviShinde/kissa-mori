import type { Route } from "./+types/table.$id";

import { useEffect, useState } from "react";

import { useLoaderData } from "react-router";

import { connectDB } from "../db.server";

import Table from "../models/table.server";

import CoffeeShop from "../../components/CoffeeShop";

import { getCoffeeImages } from "../utils/s3.server";

import { authClient } from "../lib/auth-client";

import LoginModal from "../../components/LoginModal";

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

export const meta: Route.MetaFunction = () => [{ title: "Menu — Kissa Mori" }];

export default function TablePage() {
  const { table, images } = useLoaderData<typeof loader>();

  const { data: session, isPending } = authClient.useSession();

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isPending || session) return;

    const guestKey = `guest-${table._id}`;
    const isGuest = sessionStorage.getItem(guestKey);

    if (!isGuest) {
      setShowLogin(true);
    }
  }, [table._id, isPending, session]);

  return (
    <>
      <CoffeeShop images={images} tableId={table._id} />

      {showLogin && (
        <LoginModal
          tableId={table._id}
          showGuest={true}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
