import { useMemo, useState } from "react";
import { Link } from "react-router";
import Fuse from "fuse.js";

import Navbar from "./Navbar";
import SearchBar from "./Searchbar";
import ItemCard from "./ItemCard";
import ItemBox from "./ItemBox";

import { useCoffee } from "../app/context/CoffeeContext";

type CoffeeShopProps = {
  images: string[];
  tableId?: string;
};

export default function CoffeeShop({ images = [], tableId }: CoffeeShopProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { coffees } = useCoffee();

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

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex flex-row items-center justify-between">
            <img src="/logo.png" className="w-36 sm:w-44" alt="Wash Coffee" />

            <Navbar />
          </div>

          <div className=" pb-4 pt-3">
            <SearchBar value={search} onChange={setSearch} />
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
                    ? `/coffee/${coffee._id}?table=${tableId}`
                    : `/coffee/${coffee._id}`
                }
              >
                <ItemCard
                  item={{
                    ...coffee,
                    id: coffee._id,
                  }}
                  image={images[imageIndex % images.length]}
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
    </div>
  );
}
