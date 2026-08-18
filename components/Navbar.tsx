import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Cart from "./Cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCart, setCartOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <ShoppingCart size={28} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>
      <Cart open={openCart} setOpen={setCartOpen} />
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
