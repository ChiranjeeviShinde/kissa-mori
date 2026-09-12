import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";
import { motion } from "motion/react";

const AddRemoveButtons = ({
  item,
  tableId,
}: {
  item: any;
  tableId: string;
}) => {
  const fetcher = useFetcher();

  const { cartItems, updateCartQuantity, cartLoaded } = useCoffee();

  const displayQuantity =
    cartItems.find((cartItem) => cartItem.coffeeId === item._id)?.qty ?? 0;

  const handleAddItem = (id: string) => {
    if (displayQuantity >= item.stock) return;
    if (displayQuantity >= 6) return;

    updateCartQuantity(id, displayQuantity + 1);

    fetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${id}`,
    });
  };

  const handleRemoveItem = (id: string) => {
    if (displayQuantity <= 1) return;

    updateCartQuantity(id, displayQuantity - 1);

    fetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${id}/remove`,
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, [fetcher.state, fetcher.data]);

  const atMinimum = displayQuantity <= 1;

  const atMaximum = displayQuantity >= item.stock || displayQuantity >= 6;

  return (
    <div className="flex w-28 items-center rounded-full border border-border bg-surface">
      <motion.button
        type="button"
        onClick={() => handleRemoveItem(item._id)}
        disabled={!cartLoaded || atMinimum}
        whileTap={{ scale: 0.78 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        className={`flex h-8 flex-1 cursor-pointer items-center justify-center px-0 transition ${
          atMinimum
            ? "cursor-not-allowed text-text-muted"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Minus size={16} />
      </motion.button>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-center text-sm font-medium text-text-primary">
        {displayQuantity}
      </span>

      <motion.button
        type="button"
        onClick={() => handleAddItem(item._id)}
        disabled={!cartLoaded || atMaximum}
        whileTap={{ scale: 0.78 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        className={`flex h-8 flex-1 cursor-pointer items-center justify-center px-0 transition ${
          atMaximum
            ? "cursor-not-allowed text-text-muted"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Plus size={16} />
      </motion.button>
    </div>
  );
};

export default AddRemoveButtons;
