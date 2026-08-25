import { useMemo, useState } from "react";
import { Link } from "react-router";
import Fuse from "fuse.js";

import Navbar from "./Navbar";
import SearchBar from "./Searchbar";
import FeaturedCard from "./FeaturedCard";
import ItemCard from "./ItemCard";
import ItemBox from "./ItemBox";

import { useCoffee } from "../app/context/CoffeeContext";

type CoffeeShopProps = {
  imageUrl: string;
  imageUrl2: string;
  tableId?: string;
};

export default function CoffeeShop({
  imageUrl,
  imageUrl2,
  tableId,
}: CoffeeShopProps) {
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
    <>
      <div className="sticky top-0 z-50 bg-[#F2F7F3] pt-3">
        <div className="m-3">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold underline">
              <img src="/logo.png" className="w-28" />
            </h1>

            <Navbar />
          </div>

          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide">
        {Array.from({ length: 10 }).map((_, i) => (
          <FeaturedCard imageUrl={imageUrl2} key={i} />
        ))}
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
        {categories.map((category) => (
          <ItemBox
            key={category}
            name={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 scrollbar-hide md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((coffee) => (
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
              imageUrl={imageUrl}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
