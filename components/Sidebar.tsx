import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { id: tableId } = useParams();

  const links = [
    { name: "All Items", href: `/table/${tableId}` },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-60 bg-black/10 backdrop-blur-md transition-all duration-500 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-70 flex h-screen w-72 flex-col border-l border-border bg-background transition-all duration-300 ease-out
        ${open ? "translate-x-0 shadow-2xl" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 transition-all  active:scale-90 active:rotate-90 duration-200 hover:rotate-90 hover:bg-surface-muted"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-4 flex flex-col">
          {links.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-6 py-6 font-serif text-xl font-medium text-text-primary transition-all duration-300 hover:bg-surface-muted hover:pl-10 active:bg-surface-muted active:scale-[0.98]"
              style={{
                transitionDelay: open ? `${index * 70}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(30px)",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
}
