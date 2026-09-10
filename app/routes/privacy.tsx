import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Privacy() {
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
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-text-secondary">
              Last updated: September 2026
            </p>

            <div className="mt-10 space-y-10 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  1. Information We Collect
                </h2>
                <p className="mt-3 leading-7">
                  When you use Kissa Mori, we may collect information needed to
                  provide our services, such as your phone number, account
                  information, order information, and information you provide
                  while using the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  2. Phone Number & OTP
                </h2>
                <p className="mt-3 leading-7">
                  If you choose to authenticate using your phone number, your
                  number is used to send verification codes and provide access
                  to your account. Verification codes are intended only for the
                  person requesting them and should not be shared.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  3. How We Use Information
                </h2>
                <p className="mt-3 leading-7">
                  Information may be used to authenticate users, process orders,
                  maintain the service, communicate with customers, and improve
                  the Kissa Mori experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  4. Information Sharing
                </h2>
                <p className="mt-3 leading-7">
                  We do not sell your personal information. Information may be
                  processed by service providers that help us operate the
                  platform, such as authentication, database, hosting, and
                  communication providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  5. Data Security
                </h2>
                <p className="mt-3 leading-7">
                  We take reasonable measures to protect information handled
                  through Kissa Mori. However, no internet-based service can
                  guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  6. Guest Usage
                </h2>
                <p className="mt-3 leading-7">
                  Some parts of Kissa Mori may be available without creating an
                  account. Information associated with guest usage may be
                  handled differently from information associated with an
                  authenticated account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  7. Changes to This Policy
                </h2>
                <p className="mt-3 leading-7">
                  We may update this Privacy Policy when our services or
                  practices change. The updated version will be made available
                  on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  8. Contact Us
                </h2>
                <p className="mt-3 leading-7">
                  If you have questions about this Privacy Policy, contact us at{" "}
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
