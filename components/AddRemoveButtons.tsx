import { Minus, Plus } from "lucide-react";
import { useFetcher } from "react-router";

const AddRemoveButtons = ({ item }: { item: any }) => {
  const fetcher = useFetcher();

  const handleAddItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${id}/cart`,
    });
  };

  const handleRemoveItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/coffee/${id}/cart/remove`,
    });
  };
  return (
    <div className="flex items-center rounded-full border border-gray-300 bg-white">
      <button
        onClick={() => handleRemoveItem(item._id)}
        disabled={item.qty === 1}
        className={`px-3 py-2 transition ${
          item.qty === 1
            ? "cursor-not-allowed text-gray-300"
            : "text-gray-700 hover:text-black"
        }`}
      >
        <Minus size={16} />
      </button>

      <span className="w-8 text-center font-medium">{item.qty}</span>

      <button
        onClick={() => handleAddItem(item._id)}
        className="px-3 py-2 transition"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default AddRemoveButtons;
