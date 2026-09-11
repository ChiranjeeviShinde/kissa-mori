import { useEffect, useState } from "react";

import { useFetcher, useNavigate, useParams } from "react-router";

import { useCoffee } from "../../app/context/CoffeeContext";

import { authClient } from "../../app/lib/auth-client";

import LoginModal from "../../components/LoginModal";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { id: tableId } = useParams();

  const checkoutFetcher = useFetcher();

  const verifyFetcher = useFetcher();

  const navigate = useNavigate();

  const { data: session, isPending } = authClient.useSession();

  const [showLogin, setShowLogin] = useState(false);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const { cartItems, setCartItems, setCartOpen } = useCoffee();

  const [showSuccess, setShowSuccess] = useState(false);

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0,
  );

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setShowLogin(true);
    }
  }, [session, isPending]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (verifyFetcher.data?.success) {
      setCartItems([]);
      setCartOpen(false);
      setPaymentLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate(`/table/${tableId}`);
      }, 3000);
    }

    if (verifyFetcher.data && !verifyFetcher.data.success) {
      setPaymentLoading(false);
    }
  }, [verifyFetcher.data, tableId, setCartItems, setCartOpen, navigate]);

  useEffect(() => {
    if (
      !checkoutFetcher.data?.success ||
      !checkoutFetcher.data?.orderId ||
      !tableId
    ) {
      return;
    }

    if (!window.Razorpay) {
      setPaymentLoading(false);
      return;
    }

    const options = {
      key: checkoutFetcher.data.keyId,

      amount: checkoutFetcher.data.amount,

      currency: checkoutFetcher.data.currency,

      name: "Kissa Mori",

      description: "Coffee Order",

      order_id: checkoutFetcher.data.orderId,

      handler: (response: any) => {
        verifyFetcher.submit(
          {
            tableId,

            razorpay_payment_id: response.razorpay_payment_id,

            razorpay_order_id: response.razorpay_order_id,

            razorpay_signature: response.razorpay_signature,
          },
          {
            method: "post",

            action: "/api/payment/verify",

            encType: "application/json",
          },
        );
      },

      modal: {
        ondismiss: () => {
          setPaymentLoading(false);
        },
      },

      prefill: {
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
      },

      theme: {
        color: "#3b2417",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", () => {
      setPaymentLoading(false);
    });

    razorpay.open();
  }, [checkoutFetcher.data, tableId, session]);

  const handlePayment = () => {
    if (!tableId || !session || cartItems.length === 0) {
      return;
    }

    setPaymentLoading(true);

    checkoutFetcher.submit(null, {
      method: "post",

      action: `/api/table/${tableId}/checkout`,
    });
  };

  useEffect(() => {
    if (checkoutFetcher.data && !checkoutFetcher.data.success) {
      setPaymentLoading(false);
    }
  }, [checkoutFetcher.data]);

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-2xl bg-background p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Order Placed!
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Your payment was successful.
            </p>

            <p className="mt-4 text-xs text-text-secondary">
              Taking you back to the table...
            </p>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => {
              navigate(-1);
              setCartOpen(true);
            }}
            className="mt-6 mb-6 cursor-pointer rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-espresso/40 hover:text-text-primary"
          >
            ← Back to Cart
          </button>

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
                        × {item.qty}
                      </p>
                    </div>

                    <p className="font-medium text-text-primary">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <div className="flex justify-between text-lg">
                  <span>Total</span>

                  <span>${total.toFixed(2)}</span>
                </div>

                {checkoutFetcher.data?.message &&
                  !checkoutFetcher.data?.success && (
                    <p className="mt-4 text-center text-red-500">
                      {checkoutFetcher.data.message}
                    </p>
                  )}

                {verifyFetcher.data?.message &&
                  !verifyFetcher.data?.success && (
                    <p className="mt-4 text-center text-red-500">
                      {verifyFetcher.data.message}
                    </p>
                  )}

                <button
                  onClick={handlePayment}
                  disabled={
                    paymentLoading ||
                    checkoutFetcher.state !== "idle" ||
                    verifyFetcher.state !== "idle"
                  }
                  className="mt-6 w-full cursor-pointer rounded-full bg-espresso py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {paymentLoading
                    ? "Processing Payment..."
                    : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showLogin && tableId && (
        <LoginModal
          tableId={tableId}
          showGuest={false}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => {
            setShowLogin(false);
          }}
        />
      )}
    </>
  );
}
