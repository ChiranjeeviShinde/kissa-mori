type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
};

type ItemCardProps = {
  item: Item;
  image: string;
};

const ItemCard = ({ item, image }: ItemCardProps) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <img src={image} alt={item.name} className="h-36 w-full object-cover" />

      <div className="flex h-28 justify-between p-4">
        <h3 className="max-w-45 text-lg font-medium leading-tight">
          {item.name}
        </h3>

        <p className="self-end text-xl font-bold text-[#383C39]">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
