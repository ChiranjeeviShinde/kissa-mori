import React from "react";
import { motion } from "motion/react";

interface ItemBoxProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

const ItemBox = ({ name, active, onClick }: ItemBoxProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={`relative shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
        active
          ? "border-border text-white shadow-sm"
          : "border-border bg-surface text-text-secondary hover:border-espresso/40 hover:text-text-primary"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-category"
          className="absolute -inset-px -z-0 rounded-full border border-espresso bg-espresso"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </motion.button>
  );
};

export default ItemBox;
