import { Menu, Mail } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Contact() {
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
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold text-text-primary">
              Contact Us
            </h1>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Have a question, suggestion, or just want to say hello? We would
              love to hear from you.
            </p>

            <div className="mt-10 rounded-2xl bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-full border border-border p-3">
                  <Mail size={22} className="text-text-primary" />
                </div>

                <div>
                  <p className="text-sm text-text-secondary">Email us</p>

                  <a
                    href="mailto:chat@kissamori.cafe"
                    className="mt-1 block text-lg font-medium text-text-primary transition hover:text-espresso"
                  >
                    chat@kissamori.cafe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
