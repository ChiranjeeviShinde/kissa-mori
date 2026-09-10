import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import Fuse from "fuse.js";

import Navbar from "./Navbar";
import SearchBar from "./Searchbar";
import ItemCard from "./ItemCard";
import ItemBox from "./ItemBox";
import Footer from "./Footer";

import { useCoffee } from "../app/context/CoffeeContext";
import { authClient } from "../app/lib/auth-client";
import Logo from "./Logo";

type CoffeeShopProps = {
  images: string[];
  tableId?: string;
};

export default function CoffeeShop({ images = [], tableId }: CoffeeShopProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { coffees, loadCart } = useCoffee();

  useEffect(() => {
    if (!tableId) return;

    loadCart(tableId);
  }, [tableId, loadCart]);

  const { data: session, isPending } = authClient.useSession();

  const categories = useMemo(
    () => ["All", ...new Set(coffees.map((coffee) => coffee.category))],
    [coffees],
  );

  const categoryItems = useMemo(
    () =>
      selectedCategory === "All"
        ? coffees
        : coffees.filter((coffee) => coffee.category === selectedCategory),
    [coffees, selectedCategory],
  );

  const fuse = useMemo(
    () =>
      new Fuse(categoryItems, {
        keys: ["name", "description", "category"],
        threshold: 0.3,
      }),
    [categoryItems],
  );

  const filteredItems = useMemo(
    () =>
      search ? fuse.search(search).map((result) => result.item) : categoryItems,
    [search, fuse, categoryItems],
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isGuest =
    tableId && sessionStorage.getItem(`guest-${tableId}`) === "true";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <Navbar images={images} />
          </div>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <>
                <span className="text-sm text-text-secondary">
                  Welcome,{" "}
                  <span className="font-medium text-text-primary">
                    {session.user.name}
                  </span>
                </span>

                <span className="h-5 w-px bg-border" />

                <button
                  onClick={() => authClient.signOut()}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Sign out
                </button>
              </>
            ) : isGuest ? (
              <span className="text-sm text-text-secondary">Guest</span>
            ) : null}
          </div>

          <div className="pb-4 pt-3">
            <SearchBar
              value={search}
              onChange={setSearch}
              ref={searchInputRef}
            />
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide sm:px-6">
          {categories.map((category) => (
            <ItemBox
              key={category}
              name={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            What we're pouring
          </span>
          <h1 className="font-serif text-3xl font-medium text-text-primary">
            {selectedCategory === "All" ? "Full Menu" : selectedCategory}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 scrollbar-hide sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((coffee) => {
            const imageIndex = coffees.findIndex(
              (item) => item._id === coffee._id,
            );

            return (
              <Link
                key={coffee._id}
                to={
                  tableId
                    ? `/coffee/${coffee._id}?table=${tableId}&image=${imageIndex}`
                    : `/coffee/${coffee._id}?image=${imageIndex}`
                }
              >
                <ItemCard
                  id={coffee._id}
                  image={images[imageIndex % images.length]}
                  tableId={tableId}
                />
              </Link>
            );
          })}

          {filteredItems.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-text-muted">
              No coffees match your search.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
