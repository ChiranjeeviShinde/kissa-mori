import { Trash2 } from "lucide-react";
import { useFetcher } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";
import { motion } from "motion/react";

const DeleteButton = ({ item, tableId }: { item: any; tableId: string }) => {
  const actionFetcher = useFetcher();
  const { updateCartQuantity } = useCoffee();

  const handleDeleteItem = (coffeeId: string) => {
    if (!tableId || !coffeeId) return;

    updateCartQuantity(coffeeId, 0);

    actionFetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${coffeeId}/delete`,
    });
  };

  return (
    <motion.button
      type="button"
      onClick={() => handleDeleteItem(item._id)}
      disabled={actionFetcher.state !== "idle"}
      whileTap={{ scale: 0.78, rotate: -10 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className="cursor-pointer rounded-full p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={18} />
    </motion.button>
  );
};

export default DeleteButton;
