import React, { useEffect } from "react";
import { useFetcher, useParams } from "react-router";

export default function Checkout() {
  const { id: tableId } = useParams();

  const cartFetcher = useFetcher();
  const checkoutFetcher = useFetcher();

  useEffect(() => {
    if (tableId) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [tableId]);

  // Reload cart after successful checkout
  useEffect(() => {
    if (checkoutFetcher.data?.success && tableId) {
      cartFetcher.load(`/api/table/${tableId}/cart`);
    }
  }, [checkoutFetcher.data, tableId]);

  const cartItems = cartFetcher.data?.items ?? [];

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-serif text-3xl font-medium text-text-primary">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-text-muted">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item: any) => (
                <div
                  key={item.coffeeId}
                  className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5"
                >
                  <div>
                    <h2 className="font-serif text-lg text-text-primary">
                      {item.name}
                    </h2>

                    <p className="text-sm text-text-secondary">
                      ${item.price} × {item.qty}
                    </p>
                  </div>

                  <p className="font-medium text-text-primary">
                    ${item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {checkoutFetcher.data?.message &&
                !checkoutFetcher.data?.success && (
                  <p className="mt-4 text-center text-red-500">
                    {checkoutFetcher.data.message}
                  </p>
                )}

              {checkoutFetcher.data?.success ? (
                <div className="mt-6 rounded-xl bg-green-50 p-4 text-center text-green-700">
                  Order placed successfully!
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!tableId) return;

                    checkoutFetcher.submit(null, {
                      method: "post",
                      action: `/api/table/${tableId}/checkout`,
                    });
                  }}
                  disabled={checkoutFetcher.state !== "idle"}
                  className="mt-6 w-full rounded-full bg-espresso py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-accent-hover disabled:opacity-50"
                >
                  {checkoutFetcher.state === "submitting"
                    ? "Placing Order..."
                    : "Place Order"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
