import { Trash2 } from "lucide-react";
import { useFetcher } from "react-router";

const DeleteButton = ({ item, tableId }: { item: any; tableId: string }) => {
  const actionFetcher = useFetcher();

  const handleDeleteItem = (coffeeId: string) => {
    if (!tableId) return;

    actionFetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${coffeeId}/delete`,
    });
  };
  return (
    <button
      onClick={() => handleDeleteItem(item.coffeeId)}
      className="cursor-pointer rounded-full p-2 text-red-500 transition hover:bg-red-50"
    >
      <Trash2 size={18} />
    </button>
  );
};

export default DeleteButton;
