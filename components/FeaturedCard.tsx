type FeaturedCardProps = {
  imageUrl: string;
};

const FeaturedCard = ({ imageUrl }: FeaturedCardProps) => {
  return (
    <div className="w-52 shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm">
      <img src={imageUrl} className="h-36 w-full object-cover" alt="coffee" />

      <div className="flex h-24 justify-between p-4">
        <h3 className="max-w-32.5 text-lg font-medium leading-tight">
          A featured coffee name
        </h3>

        <p className="self-end text-xl font-bold text-[#383C39]">$10</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
