import { createContext, useContext } from "react";

type Coffee = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  qty: number;
};

type CoffeeContextType = {
  coffees: Coffee[];
};

const CoffeeContext = createContext<CoffeeContextType | null>(null);

export function CoffeeProvider({
  coffees,
  children,
}: {
  coffees: Coffee[];
  children: React.ReactNode;
}) {
  return (
    <CoffeeContext.Provider value={{ coffees }}>
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
