import React from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCoffee } from "../app/context/CoffeeContext";
import { useFetcher } from "react-router";

type CartProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Cart({ open, setOpen }: CartProps) {
  const { coffees } = useCoffee();

  const cartItems = coffees.filter((coffee) => coffee.qty > 0);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const fetcher = useFetcher();

  const handleAddItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${id}/cart`,
    });
  };

  const handleRemoveItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${id}/cart/remove`,
    });
  };

  const handleDeleteItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${id}/cart/delete`,
    });
  };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-96 flex-col border-l border-[#353634] bg-[#F2F7F3] shadow-2xl transition-all duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#D9DED8] p-6">
          <h2 className="text-2xl font-bold text-[#353634]">Your Cart</h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 transition duration-200 hover:rotate-90 hover:bg-[#E9F1EC] active:scale-90"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 rounded-3xl bg-[#FBF9F6] p-4 shadow-sm"
            >
              <img
                src="/coffee.jpg"
                alt={item.name}
                className="h-24 w-24 rounded-2xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#353634]">{item.name}</h3>

                  <p className="mt-1 text-sm text-gray-500">${item.price}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-gray-300 bg-white">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="px-3 py-2 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-8 text-center font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => handleAddItem(item._id)}
                      className="px-3 py-2 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D9DED8] bg-[#F2F7F3] p-6">
          <div className="mb-2 flex justify-between text-[#555]">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>

          <div className="mb-2 flex justify-between text-[#555]">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="mb-6 flex justify-between text-xl font-bold text-[#353634]">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button className="w-full rounded-full bg-[#353634] py-3 text-lg font-semibold text-white transition hover:bg-[#232422]">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
