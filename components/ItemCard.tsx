type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const handleClick = () => {
    console.log("item card clicked! - ", item.id);
  };

  return (
    <div
      onClick={handleClick}
      className="overflow-hidden rounded-3xl bg-white shadow-sm"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-36 w-full object-cover"
      />

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
