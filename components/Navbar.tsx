import { Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
import { useCoffee } from "../app/context/CoffeeContext";

type NavbarProps = {
  images: string[];
};

export default function Navbar({ images }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { openCart, setCartOpen } = useCoffee();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "c") {
        setCartOpen(true);
      }

      if (e.key === "Escape") {
        setCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-border bg-surface p-2.5 text-text-primary transition hover:border-espresso/40 active:scale-95"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-border bg-surface p-2.5 text-text-primary transition hover:border-espresso/40 active:scale-95"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
      <Cart open={openCart} setOpen={setCartOpen} images={images} />
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
