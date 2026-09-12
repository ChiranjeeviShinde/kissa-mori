import { useFetcher } from "react-router";
import { useCoffee } from "../app/context/CoffeeContext";
import AddRemoveButtons from "./AddRemoveButtons";
import { AnimatePresence, motion } from "motion/react";

type ItemCardProps = {
  id: string;
  image: string;
  tableId?: string;
  index?: number;
};

const ItemCard = ({ id, image, tableId, index = 0 }: ItemCardProps) => {
  const { coffees, updateCartQuantity, cartItems, cartLoaded } = useCoffee();

  const item = coffees.find((coffee) => coffee._id === id);
  const actionFetcher = useFetcher();

  if (!item) return null;



  const quantity =
    cartItems.find((cartItem) => cartItem.coffeeId === item._id)?.qty ?? 0;

  const handleAddToCart = () => {
    if (!tableId) {
      console.error("No tableId found");
      return;
    }

    if (actionFetcher.state !== "idle") return;

    updateCartQuantity(item._id, 1);

    actionFetcher.submit(null, {
      method: "post",
      action: `/api/table/${tableId}/cart/${item._id}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={item.name}
          className="block h-40 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
          {item.category}
        </span>

        <h3 className="font-serif text-lg font-medium leading-tight text-text-primary">
          {item.name}
        </h3>

        {item.description && (
          <p className="line-clamp-2 text-xs text-text-secondary">
            {item.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="text-base text-text-primary">
            <span className="text-sm text-text-secondary">$</span>

            <span className="text-2xl font-semibold">{item.price}</span>
          </span>

          <div className="flex shrink-0 items-center justify-end">
  {item.stock === 0 ? (
    <span className="rounded-full w-28 bg-gray-200 px-2.5 py-2 text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:px-3 sm:text-[11px]">
      Out of Stock
    </span>
  ) : !cartLoaded ? (
    <div aria-hidden="true" className="h-8 w-28" />
  ) : (
    <AnimatePresence initial={false} mode="popLayout">
      {quantity === 0 ? (
        <motion.button
          key="add-to-cart"
          layoutId={`cart-control-${item._id}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={actionFetcher.state !== "idle"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 500,
              damping: 35,
            },
            opacity: {
              duration: 0.12,
            },
          }}
          className="w-28 shrink-0 cursor-pointer rounded-full bg-espresso px-2.5 py-2 text-[10px] font-medium uppercase tracking-wider text-white group-hover:bg-accent-hover sm:px-3 sm:text-[11px]"
        >
          Add to Cart
        </motion.button>
      ) : (
        <motion.div
          key="quantity"
          layoutId={`cart-control-${item._id}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 500,
              damping: 35,
            },
            opacity: {
              duration: 0.15,
            },
          }}
          className="origin-center shrink-0"
        >
          <AddRemoveButtons
            item={{
              ...item,
              qty: quantity,
            }}
            tableId={tableId!}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )}
</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
