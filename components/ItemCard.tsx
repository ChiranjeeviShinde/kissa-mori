import { useFetcher, useSearchParams } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";
import AddRemoveButtons from "./AddRemoveButtons";
import { useEffect, useState } from "react";

type ItemCardProps = {
  id: string;
  image: string;
  tableId?: string;
};

const ItemCard = ({ id, image, tableId }: ItemCardProps) => {
  const { coffees } = useCoffee();

  const item = coffees.find((coffee) => coffee._id === id);

  if (!item) return null;

  const cartFetcher = useFetcher();
  const actionFetcher = useFetcher();

  useEffect(() => {
    if (tableId && cartFetcher.state === "idle" && !cartFetcher.data) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [tableId]);

  const cartLoaded = cartFetcher.data !== undefined;

  const cartItems = cartFetcher.data?.items ?? [];

  const cartItem = cartItems.find(
    (cartItem: any) => cartItem.coffeeId === item._id,
  );

  const quantity = cartItem?.qty ?? 0;

  useEffect(() => {
    if (tableId && actionFetcher.state === "idle" && actionFetcher.data) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [actionFetcher.state, actionFetcher.data, tableId]);

  useEffect(() => {
    if (actionFetcher.state === "idle" && actionFetcher.data) {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, [actionFetcher.state, actionFetcher.data]);

  const handleAddToCart = () => {
    if (!tableId) {
      console.error("No tableId found");
      return;
    }

    if (actionFetcher.state !== "idle") return;

    actionFetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${item._id}`,
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={item.name}
          className="block h-40 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
          {item.category}
        </span>

        <h3 className="font-serif text-lg font-medium leading-tight text-text-primary">
          {item.name}
        </h3>

        {item.description && (
          <p className="line-clamp-2 text-xs text-text-secondary">
            {item.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base text-text-primary">
            <span className="text-sm text-text-secondary">$</span>
            <span className="text-2xl font-semibold">{item.price}</span>
          </span>

          <span>
            {item.stock === 0 ? (
              <span className="rounded-full bg-gray-200 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Out of Stock
              </span>
            ) : !cartLoaded ? null : quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={actionFetcher.state !== "idle"}
                className="cursor-pointer rounded-full bg-espresso px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white transition group-hover:bg-accent-hover"
              >
                Add to Cart
              </button>
            ) : (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <AddRemoveButtons
                  item={{
                    ...item,
                    qty: quantity,
                  }}
                  tableId={tableId!}
                />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
