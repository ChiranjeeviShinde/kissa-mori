type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
};

type ItemCardProps = {
  item: Item;
  image: string;
};

const ItemCard = ({ item, image }: ItemCardProps) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={item.name}
          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
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

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base  text-text-primary">
            <span className="text-sm text-text-secondary">$</span>
            <span className="text-2xl font-semibold">{item.price}</span>
          </span>

          <span className="rounded-full bg-espresso px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white transition group-hover:bg-accent-hover">
            Order
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
