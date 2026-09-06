import { createContext, useCallback, useContext, useState } from "react";

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
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  updateCartQuantity: (coffeeId: string, quantity: number) => void;
  loadCart: (tableId: string) => Promise<void>;
  cartLoaded: boolean;
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
  const [cartItems, setCartItems] = useState<any[]>([]);

  const updateCartQuantity = (coffeeId: string, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.coffeeId === coffeeId);

      if (quantity <= 0) {
        return prev.filter((item) => item.coffeeId !== coffeeId);
      }

      if (existing) {
        return prev.map((item) =>
          item.coffeeId === coffeeId ? { ...item, qty: quantity } : item,
        );
      }

      const coffee = coffees.find((coffee) => coffee._id === coffeeId);

      if (!coffee) return prev;

      return [
        ...prev,
        {
          ...coffee,
          coffeeId,
          qty: quantity,
        },
      ];
    });
  };

  const [cartLoaded, setCartLoaded] = useState(false);

  const loadCart = useCallback(async (tableId: string) => {
    try {
      setCartLoaded(false);

      const response = await fetch(`/api/table/${tableId}/cart`);

      const data = await response.json();

      setCartItems(data.items ?? []);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setCartLoaded(true);
    }
  }, []);

  return (
    <CoffeeContext.Provider
      value={{
        coffees,
        openCart,
        setCartOpen,
        cartItems,
        setCartItems,
        updateCartQuantity,
        loadCart,
        cartLoaded,
      }}
    >
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
