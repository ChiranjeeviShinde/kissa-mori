import React from "react";

interface ItemBoxProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

const ItemBox = ({ name, active, onClick }: ItemBoxProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-35 border border-[#313733] shrink-0 items-center justify-center rounded-2xl bg-[#CFDBD1] p-2 text-center text-sm font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {name}
    </button>
  );
};

export default ItemBox;
