import React from "react";

const ItemCard = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-[#FBF9F6] shadow-sm">
      <img
        src="/coffee.jpg"
        alt="coffee"
        className="h-36 w-full object-cover"
      />

      <div className="flex items-end justify-between p-4">
        <h3 className="max-w-[70%] text-lg font-semibold leading-tight">
          A big long coffee name
        </h3>

        <p className="text-lg font-bold">$7</p>
      </div>
    </div>
  );
};

export default ItemCard;
