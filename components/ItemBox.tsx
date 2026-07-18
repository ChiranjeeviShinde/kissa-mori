import React from "react";

interface ItemBoxProps {
  name: string;
}

const ItemBox = ({ name }: ItemBoxProps) => (
  <button className="flex h-10 w-25 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FBF9F6] p-2 text-center text-sm font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    {name}
  </button>
);

export default ItemBox;
