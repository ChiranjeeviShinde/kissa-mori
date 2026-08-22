import type { Route } from "./+types/home";
import { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/Searchbar";
import FeaturedCard from "../../components/FeaturedCard";
import ItemCard from "../../components/ItemCard";
import ItemBox from "../../components/ItemBox";
import { Link } from "react-router";
import Fuse from "fuse.js";
import { useCoffee } from "../context/CoffeeContext";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kissa Mori" },
    { name: "description", content: "Welcome to Kissa Mori Café!" },
  ];
}

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_BUCKET_ACCESS_SECRET_KEY_ID!,
  },
});

async function getImage(key: string) {
  const command = new GetObjectCommand({
    Bucket: "kissa-mori",
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 1000 });
}

// export async function loader() {
//   await connectDB();

//   const items = await Coffee.find().lean();

//   return {
//     items: items.map((item) => ({
//       ...item,
//       _id: item._id.toString(),
//     })),
//   };
// }

export async function loader() {
  const imageUrl = await getImage("coffee.jpg");
  const imageUrl2 = await getImage("coffee2.jpg");

  return {
    imageUrl,
    imageUrl2,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // const [loadingScreen, setLoadingScreen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { coffees } = useCoffee();

  const { imageUrl, imageUrl2 } = loaderData;

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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoadingScreen(false);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loadingScreen) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#F2F7F3] pt-3 ">
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
        {filteredItems.map((coffee) => {
          return (
            <Link key={coffee._id} to={`/coffee/${coffee._id}`}>
              <ItemCard
                item={{
                  ...coffee,
                  id: coffee._id,
                }}
                imageUrl={imageUrl}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
