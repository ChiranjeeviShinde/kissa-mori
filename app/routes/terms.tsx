import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Terms() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex flex-row items-center justify-between">
            <img src="/logo.png" className="w-36 sm:w-44" alt="Kissa Mori" />

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer rounded-full border border-border bg-surface p-2.5 text-text-primary transition hover:border-espresso/40 active:scale-95"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} />

      <main className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold text-text-primary">
              Terms & Conditions
            </h1>

            <p className="mt-4 text-sm text-text-secondary">
              Last updated: September 2026
            </p>

            <div className="mt-10 space-y-10 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  1. Using Kissa Mori
                </h2>
                <p className="mt-3 leading-7">
                  Kissa Mori provides a digital platform for browsing our menu
                  and placing orders. By using the service, you agree to use it
                  responsibly and provide accurate information when required.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  2. Orders
                </h2>
                <p className="mt-3 leading-7">
                  Orders placed through Kissa Mori are subject to availability.
                  We reserve the right to accept, modify, or cancel an order
                  when necessary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  3. Pricing
                </h2>
                <p className="mt-3 leading-7">
                  Prices displayed on the platform may change from time to time.
                  The applicable price is the price shown when an order is
                  placed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  4. Account & Authentication
                </h2>
                <p className="mt-3 leading-7">
                  If you choose to sign in using your phone number, you are
                  responsible for providing a phone number that you have
                  permission to use. Verification codes should not be shared
                  with others.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  5. Guest Access
                </h2>
                <p className="mt-3 leading-7">
                  Kissa Mori may allow customers to browse and place orders as
                  guests. Guest functionality may have limitations compared with
                  authenticated accounts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  6. Changes to the Service
                </h2>
                <p className="mt-3 leading-7">
                  We may update, modify, or discontinue parts of the service
                  when necessary to improve the Kissa Mori experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  7. Contact
                </h2>
                <p className="mt-3 leading-7">
                  For questions regarding these terms, contact us at{" "}
                  <a
                    href="mailto:chat@kissamori.cafe"
                    className="font-medium text-text-primary underline"
                  >
                    chat@kissamori.cafe
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
