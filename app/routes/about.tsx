import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function About() {
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
          <h1 className="text-4xl font-semibold text-text-primary">
            About Kissa Mori
          </h1>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Kissa Mori is a cozy coffee experience designed to make ordering
            simple, comfortable, and enjoyable.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-surface p-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Our Story
              </h2>

              <p className="mt-3 leading-7 text-text-secondary">
                Inspired by the warmth of traditional coffee houses, Kissa Mori
                brings together good coffee, thoughtful design, and a smooth
                ordering experience.
              </p>
            </div>

            <div className="rounded-2xl bg-surface p-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Our Goal
              </h2>

              <p className="mt-3 leading-7 text-text-secondary">
                We want every visit to feel personal — from discovering your
                favorite drink to placing your order.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
