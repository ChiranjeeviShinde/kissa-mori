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
      className={`shrink-0 whitespace-nowrap rounded-full cursor-pointer border px-5 py-2 text-xs font-medium uppercase tracking-wider transition ${
        active
          ? "border-espresso bg-espresso text-white shadow-sm"
          : "border-border bg-surface text-text-secondary hover:border-espresso/40 hover:text-text-primary"
      }`}
    >
      {name}
    </button>
  );
};

export default ItemBox;
