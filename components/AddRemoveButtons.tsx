import { Minus, Plus } from "lucide-react";
import { useFetcher } from "react-router";

const AddRemoveButtons = ({
  item,
  tableId,
}: {
  item: any;
  tableId: string;
}) => {
  const fetcher = useFetcher();

  const handleAddItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${id}`,
    });
  };

  const handleRemoveItem = (id: string) => {
    fetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${id}/remove`,
    });
  };
  return (
    <div className="flex items-center rounded-full border border-border bg-surface">
      <button
        onClick={() => handleRemoveItem(item._id)}
        disabled={item.qty === 1}
        className={`px-3 py-2 transition ${
          item.qty === 1
            ? "cursor-not-allowed text-text-muted"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Minus size={16} />
      </button>

      <span className="w-8 text-center text-sm font-medium text-text-primary">
        {item.qty}
      </span>

      <button
        onClick={() => handleAddItem(item._id)}
        className="px-3 py-2 text-text-secondary transition hover:text-text-primary"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default AddRemoveButtons;
