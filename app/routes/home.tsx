import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/Searchbar";
import FeaturedCard from "../../components/FeaturedCard";
import ItemCard from "../../components/ItemCard";
import ItemBox from "../../components/ItemBox";
import { categories, items } from "../../data/menu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kissa Mori" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#F2F7F3] pt-3 ">
        <div className="m-3">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold underline">
              <img src="/public/logo.png" className="w-28" />
            </h1>
            <Navbar />
          </div>
          <SearchBar />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide">
        {Array.from({ length: 20 }).map((_, i) => (
          <FeaturedCard key={i} />
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
        {filteredItems.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </>
  );
}
