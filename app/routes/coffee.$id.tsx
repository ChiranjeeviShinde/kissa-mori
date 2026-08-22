import { useFetcher, useParams } from "react-router";
import { useCoffee } from "../context/CoffeeContext";
import { useNavigate } from "react-router-dom";
import AddRemoveButtons from "../../components/AddRemoveButtons";

export default function CoffeePage() {
  const { coffees } = useCoffee();
  const { id } = useParams();

  const coffee = coffees.find((c) => c._id === id);

  if (!coffee) {
    return <h1>Coffee not found</h1>;
  }

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleAddToCart = () => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${coffee._id}/cart`,
    });
  };

  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-8 rounded-[40px] bg-[#F2F7F3] p-6 md:mt-10 md:flex-row md:gap-10 md:p-12">
      <div className="w-fit shrink-0 md:w-[38%]">
        <img
          src="/coffee.jpg"
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

            {coffee.qty === 0 ? (
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-[#383C39] px-6 py-3 text-white transition hover:opacity-90 sm:mt-6"
              >
                Add to Cart
              </button>
            ) : (
              <AddRemoveButtons item={coffee} />
            )}
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
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-[#383C39] px-6 py-3 text-white transition hover:opacity-90 sm:mt-6"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
