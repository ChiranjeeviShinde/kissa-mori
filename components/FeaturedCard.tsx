import React from "react";

const FeaturedCard = () => {
  return (
    <div className="w-52 shrink-0 overflow-hidden rounded-3xl bg-[#FBF9F6] shadow-sm">
      <img
        src="/coffee2.jpg"
        className="h-36 w-full object-cover"
        alt="coffee"
      />

      <div className="flex items-end justify-between p-4">
        <h3 className="max-w-[70%] text-lg font-semibold leading-tight">
          A featured coffee name
        </h3>

        <p className="text-lg font-bold">$10</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
