import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";

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
    <div className="flex items-center rounded-full border border-border bg-surface">
      <button
        onClick={() => handleRemoveItem(item._id)}
        disabled={!cartLoaded || atMinimum}
        className={`cursor-pointer px-3 py-2 transition ${
          atMinimum
            ? "cursor-not-allowed text-text-muted"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Minus size={16} />
      </button>

      <span className="w-8 text-center text-sm font-medium text-text-primary">
        {displayQuantity}
      </span>

      <button
        onClick={() => handleAddItem(item._id)}
        disabled={!cartLoaded || atMaximum}
        className={`cursor-pointer px-3 py-2 transition ${
          atMaximum
            ? "cursor-not-allowed text-text-muted"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default AddRemoveButtons;
