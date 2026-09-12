import { QrCode, Smartphone, ShoppingCart, Utensils } from "lucide-react";
export const meta: Route.MetaFunction = () => [{ title: "Menu — Kissa Mori" }];
export default function Menu() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card">
            <QrCode size={42} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Scan the QR code to get started
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            Find the QR code placed on your table and scan it with your phone.
            It connects you to your table and opens the Kissa Mori menu.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background">
                <Smartphone size={24} strokeWidth={1.7} />
              </div>

              <h2 className="font-medium">1. Scan</h2>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Scan the QR code on your table using your phone camera.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background">
                <Utensils size={24} strokeWidth={1.7} />
              </div>

              <h2 className="font-medium">2. Browse & Order</h2>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Explore the menu, choose your favourites, and add them to your
                table's cart.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background">
                <ShoppingCart size={24} strokeWidth={1.7} />
              </div>

              <h2 className="font-medium">3. Place Order</h2>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Sign in when required and place your order directly from your
                table.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-5">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">
                Why scan the QR code?
              </span>{" "}
              Each table has its own unique QR code, so your cart and order are
              automatically linked to the correct table.
            </p>
          </div>

          <p className="mt-8 text-sm text-text-secondary">
            Please scan the QR code placed on your table to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
