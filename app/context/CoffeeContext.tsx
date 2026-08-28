import { createContext, useContext, useState } from "react";

type Coffee = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  ingredients: string;
  size: number;
  cal: number;
  rating: number;
};

type CoffeeContextType = {
  coffees: Coffee[];
  openCart: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CoffeeContext = createContext<CoffeeContextType | null>(null);

export function CoffeeProvider({
  coffees,
  children,
}: {
  coffees: Coffee[];
  children: React.ReactNode;
}) {
  const [openCart, setCartOpen] = useState(false);

  return (
    <CoffeeContext.Provider value={{ coffees, openCart, setCartOpen }}>
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);

  if (!context) {
    throw new Error("useCoffee must be used inside CoffeeProvider");
  }

  return context;
}
