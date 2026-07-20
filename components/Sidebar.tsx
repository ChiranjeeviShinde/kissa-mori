import { X } from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const links = [
  { name: "All Items", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-72 flex-col border-l border-[#353634] bg-[#F2F7F3] shadow-2xl transition-all duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 transition-all  active:scale-90 active:rotate-90 duration-200 hover:rotate-90 hover:bg-[#E9F1EC]"
          >
            <X size={30} />
          </button>
        </div>

        <div className="mt-4 flex flex-col">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-6 text-xl font-medium text-[#363936] transition-all duration-300 hover:bg-[#E9F1EC] hover:pl-10 active:bg-[#E9F1EC] active:scale-[0.98]"
              style={{
                transitionDelay: open ? `${index * 70}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(30px)",
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
