import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useFetcher, useParams } from "react-router";
import AddRemoveButtons from "./AddRemoveButtons";
import { useNavigate } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";
import DeleteButton from "./DeleteButton";

type CartProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
};

export default function Cart({ open, setOpen, images }: CartProps) {
  const { id: tableId } = useParams();
  const { coffees, cartItems } = useCoffee();

  const cartFetcher = useFetcher();

  const navigate = useNavigate();

  useEffect(() => {
    if (tableId && cartFetcher.state === "idle" && !cartFetcher.data) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [tableId]);

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0,
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-60 bg-black/10 backdrop-blur-md transition-all duration-500 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-70 flex h-screen w-96 flex-col border-l border-border bg-background transition-all duration-300 ease-out ${
          open ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-serif text-2xl font-medium text-text-primary">
            Your Cart
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 transition duration-200 hover:rotate-90 hover:bg-surface-muted active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cartItems.length === 0 && (
            <p className="pt-10 text-center text-sm text-text-muted">
              Your cart is empty.
            </p>
          )}

          {cartItems.map((item: any) => {
            const imageIndex = coffees.findIndex(
              (coffee) => coffee._id === item.coffeeId,
            );
            return (
              <div
                key={item.coffeeId}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
              >
                <img
                  src={images[imageIndex % images.length]}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-text-primary">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <AddRemoveButtons
                      item={{
                        ...item,
                        _id: item.coffeeId,
                      }}
                      tableId={tableId!}
                    />

                    <DeleteButton
                      item={{
                        ...item,
                        _id: item.coffeeId,
                      }}
                      tableId={tableId!}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border bg-background p-6">
          <div className="mb-2 flex justify-between text-sm text-text-secondary">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>

          <div className="mb-6 flex justify-between font-serif text-xl font-medium text-text-primary">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={() => {
              if (tableId) {
                setOpen(false);
                navigate(`/table/${tableId}/checkout`);
              }
            }}
            disabled={cartItems.length === 0}
            className="w-full rounded-full bg-espresso py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-accent-hover cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
