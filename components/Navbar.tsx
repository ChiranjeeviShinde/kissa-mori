import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50">
        <button
          onClick={() => setOpen(!open)}
          className="transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Menu size={30} />
        </button>
      </nav>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
