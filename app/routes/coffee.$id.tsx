import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/coffee.$id";
import { connectDB } from "../db.server";
import Coffee from "../models/coffee.server";

export async function loader({ params }: Route.LoaderArgs) {
  await connectDB();

  const coffee = await Coffee.findById(params.id).lean().exec();

  if (!coffee) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    coffee: {
      ...coffee,
      _id: coffee._id.toString(),
    },
  };
}

export default function CoffeePage() {
  const { coffee } = useLoaderData<typeof loader>();

  if (!coffee) {
    return <h1>Coffee not found</h1>;
  }

  // return (
  //   <div className="mt-10 mx-auto flex max-w-6xl gap-10 rounded-[40px] bg-[#F2F7F3] p-12 md:flex-row md:p-12">
  //     <img
  //       src={coffee.image}
  //       alt={coffee.name}
  //       className="h-145 w-85 rounded-4xl object-cover"
  //     />

  //     <div className="flex flex-1 flex-col">
  //       <div className="flex items-start justify-between">
  //         <div>
  //           <h1 className="text-4xl font-bold">{coffee.name}</h1>

  //           <p className="mt-2 text-xl text-gray-500">{coffee.category}</p>
  //         </div>

  //         <div className="text-right">
  //           <p className="text-4xl font-bold">${coffee.price}</p>

  //           <button className="mt-6 rounded-full bg-[#383C39] px-8 py-3 text-white transition hover:opacity-90">
  //             Add to Cart
  //           </button>
  //         </div>
  //       </div>

  //       <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm">
  //         <h2 className="mb-3 text-xl font-semibold">Description</h2>

  //         <p className="leading-8 text-gray-600">{coffee.description}</p>
  //       </div>

  //       <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
  //         <h2 className="mb-3 text-xl font-semibold">Ingredients</h2>

  //         <p className="text-gray-600">
  //           Premium Arabica beans, steamed milk, milk foam.
  //         </p>

  //         <div className="mt-8 grid grid-cols-3 gap-6">
  //           <div className="rounded-3xl bg-white p-6 shadow-sm">
  //             <p className="text-sm text-gray-500">Size</p>
  //             <p className="mt-2 text-xl font-semibold">12 oz</p>
  //           </div>

  //           <div className="rounded-3xl bg-white p-6 shadow-sm">
  //             <p className="text-sm text-gray-500">Calories</p>
  //             <p className="mt-2 text-xl font-semibold">140 kcal</p>
  //           </div>

  //           <div className="rounded-3xl bg-white p-8 py-5 shadow-sm">
  //             <p className="text-sm text-gray-500">Rating</p>
  //             <p className="mt-2 text-xl font-semibold"> 4 </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-8 rounded-[40px] bg-[#F2F7F3] p-6 md:mt-10 md:flex-row md:gap-10 md:p-12">
      <div className="w-fit shrink-0 md:w-[38%]">
        <img
          src={coffee.image}
          alt={coffee.name}
          className="h-87.5 w-90 rounded-4xl object-cover md:h-145"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{coffee.name}</h1>

            <p className="mt-2 text-lg text-gray-500 md:text-xl">
              {coffee.category}
            </p>
          </div>

          <div className="flex items-center justify-between sm:block sm:text-right">
            <p className="text-3xl font-bold md:text-4xl">${coffee.price}</p>

            <button className="rounded-full bg-[#383C39] px-6 py-3 text-white transition hover:opacity-90 sm:mt-6">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Description</h2>

          <p className="leading-8 text-gray-600">{coffee.description}</p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Ingredients</h2>

          <p className="leading-7 text-gray-600">
            Premium Arabica beans, steamed milk, milk foam.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-[#F9F9F9] p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">Size</p>
              <p className="mt-2 text-xl font-semibold">12 oz</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#F9F9F9] p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="mt-2 text-xl font-semibold">140 kcal</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#F9F9F9] p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">Rating</p>
              <p className="mt-2 text-xl font-semibold">⭐ 4.8</p>
            </div>
          </div>
          <Link type="button" to={"/"}>
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
