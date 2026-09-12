import { getCoffeeImages } from "../utils/s3.server";
import type { Route } from "./+types/coffee.$id";

import { useParams, useSearchParams, useLoaderData } from "react-router";

import { useCoffee } from "../context/CoffeeContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Delete } from "lucide-react";
import AddRemoveButtons from "../../components/AddRemoveButtons";
import { getImageFromRequest } from "../utils/image.server";
import DeleteButton from "../../components/DeleteButton";
import { AnimatePresence, motion } from "motion/react";

export async function loader({ request }: Route.LoaderArgs) {
  const image = await getImageFromRequest(request, getCoffeeImages);

  return { image };
}
export const meta: Route.MetaFunction = () => [{ title: "Coffee — Kissa Mori" }];

export default function CoffeePage() {
  const { coffees, cartItems, updateCartQuantity, cartLoaded } = useCoffee();

  const { id } = useParams();

  const { image } = useLoaderData<typeof loader>();

  const [searchParams] = useSearchParams();

  const tableId = searchParams.get("table");

  const navigate = useNavigate();

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

  const cartItem = cartItems.find((item) => item.coffeeId === coffee._id);

  const quantity = cartItem?.qty ?? 0;

  const handleAddToCart = () => {
    if (!tableId) return;

    updateCartQuantity(coffee._id, 1);

    fetch(`/api/table/${tableId}/cart/${coffee._id}`, {
      method: "POST",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <button
          onClick={() => navigate(`/table/${tableId}`)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-espresso/40 hover:text-text-primary"
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

              <div className="flex min-h-8 items-center gap-4">
                {coffee.stock === 0 ? (
                  <span className="flex h-8 w-28 items-center justify-center rounded-full bg-gray-200 px-2.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:text-[11px]">
                    Out of Stock
                  </span>
                ) : !cartLoaded ? (
                  <div aria-hidden="true" className="h-8 w-28" />
                ) : (
                  <AnimatePresence initial={false} mode="popLayout">
                    {quantity === 0 ? (
                      <motion.button
                        key="add-to-cart"
                        layoutId={`cart-control-${coffee._id}`}
                        onClick={handleAddToCart}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          layout: {
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          },
                          opacity: { duration: 0.12 },
                        }}
                        className="flex h-8 w-28 shrink-0 cursor-pointer items-center justify-center rounded-full bg-espresso px-2.5 text-[10px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-accent-hover sm:text-[11px]"
                      >
                        Add to Cart
                      </motion.button>
                    ) : (
                      <motion.div
                        key="quantity"
                        layoutId={`cart-control-${coffee._id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          layout: {
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          },
                          opacity: { duration: 0.15 },
                        }}
                        className="flex shrink-0 items-center gap-2"
                      >
                        <AddRemoveButtons item={coffee} tableId={tableId!} />
                        <DeleteButton item={coffee} tableId={tableId!} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
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
