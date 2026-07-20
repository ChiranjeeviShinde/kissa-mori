import type { Item } from "./item";

export const categories = [
  "All",
  "Espresso",
  "Latte",
  "Cappuccino",
  "Mocha",
  "Cold Brew",
  "Iced",
  "Tea",
  "Desserts",
];

export const items: Item[] = [
  {
    id: 1,
    name: "Espresso",
    category: "Espresso",
    price: 5,
    image: "/coffee.jpg",
  },
  {
    id: 2,
    name: "Double Espresso",
    category: "Espresso",
    price: 6,
    image: "/coffee.jpg",
  },
  {
    id: 3,
    name: "Cappuccino",
    category: "Cappuccino",
    price: 7,
    image: "/coffee.jpg",
  },
  {
    id: 4,
    name: "Latte",
    category: "Latte",
    price: 8,
    image: "/coffee.jpg",
  },
  {
    id: 5,
    name: "Vanilla Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
  },
  {
    id: 6,
    name: "Caramel Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
  },
  {
    id: 7,
    name: "Mocha",
    category: "Mocha",
    price: 10,
    image: "/coffee.jpg",
  },
  {
    id: 8,
    name: "White Mocha",
    category: "Mocha",
    price: 11,
    image: "/coffee.jpg",
  },
  {
    id: 9,
    name: "Cold Brew",
    category: "Cold Brew",
    price: 8,
    image: "/coffee.jpg",
  },
  {
    id: 10,
    name: "Iced Americano",
    category: "Cold Brew",
    price: 7,
    image: "/coffee.jpg",
  },
];
