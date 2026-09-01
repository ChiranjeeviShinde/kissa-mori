import { getCoffeeImages } from "../utils/s3.server";
import type { Route } from "./+types/coffee.$id";
import {
  useFetcher,
  useParams,
  useSearchParams,
  useLoaderData,
} from "react-router";
import { useCoffee } from "../context/CoffeeContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AddRemoveButtons from "../../components/AddRemoveButtons";
import { useEffect, useState } from "react";
import { getImageFromRequest } from "../utils/image.server";
import DeleteButton from "../../components/DeleteButton";

export async function loader({ request }: Route.LoaderArgs) {
  const image = await getImageFromRequest(request, getCoffeeImages);

  return { image };
}

export default function CoffeePage() {
  const { coffees } = useCoffee();
  const { id } = useParams();
  const { image } = useLoaderData<typeof loader>();

  const coffee = coffees.find((c) => c._id === id);

  if (!coffee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <h1 className="font-serif text-2xl text-text-primary">
          Coffee not found
        </h1>
      </div>
    );
  }
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("table");

  const navigate = useNavigate();

  const cartFetcher = useFetcher();
  const actionFetcher = useFetcher();

  useEffect(() => {
    if (tableId) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [tableId]);

  const cartItems = cartFetcher.data?.items ?? [];

  const cartItem = cartItems.find((item: any) => item.coffeeId === coffee._id);

  const quantity = cartItem?.qty ?? 0;

  const handleAddToCart = () => {
    actionFetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${coffee._id}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <button
          onClick={() => navigate(`/table/${tableId}`)}
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-espresso/40 hover:text-text-primary cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to menu
        </button>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row md:gap-12">
        <div className="w-full shrink-0 md:w-[38%]">
          <img
            src={image}
            alt={coffee.name}
            className="h-72 w-full rounded-2xl border border-border object-cover md:h-145"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-accent">
                {coffee.category}
              </span>

              <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
                {coffee.name}
              </h1>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <p className="text-2xl font-semibold text-text-primary md:text-3xl">
                ${coffee.price}
              </p>
              <div className="flex items-center gap-4">
                {quantity === 0 ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={coffee.stock === 0}
                    className={`cursor-pointer rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wider transition ${
                      coffee.stock === 0
                        ? "bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed"
                        : "bg-espresso text-white hover:bg-accent-hover"
                    }`}
                  >
                    {coffee.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                ) : (
                  <AddRemoveButtons
                    item={{ ...coffee, qty: quantity }}
                    tableId={tableId!}
                  />
                )}
                <DeleteButton
                  item={{ ...coffee, qty: quantity }}
                  tableId={tableId!}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 font-serif text-xl font-medium text-text-primary">
              Description
            </h2>

            <p className="leading-7 text-text-secondary">
              {coffee.description}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 font-serif text-xl font-medium text-text-primary">
              Ingredients
            </h2>

            <p className="leading-7 text-text-secondary">
              {coffee.ingredients}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-background p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Size
                </p>
                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {coffee.size} oz
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Calories
                </p>
                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {coffee.cal} kcal
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Rating
                </p>
                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {coffee.rating}
                </p>
              </div>
            </div>
            {coffee.stock <= 3 && coffee.stock > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Only {coffee.stock} left in stock
              </div>
            )}

            {coffee.stock === 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Out of stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
