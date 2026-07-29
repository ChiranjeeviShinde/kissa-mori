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
    description:
      "A rich, concentrated shot of coffee with a bold aroma and smooth crema.",
  },
  {
    id: 2,
    name: "Double Espresso",
    category: "Espresso",
    price: 6,
    image: "/coffee.jpg",
    description:
      "Two shots of espresso for a stronger, fuller coffee experience.",
  },
  {
    id: 3,
    name: "Cappuccino",
    category: "Cappuccino",
    price: 7,
    image: "/coffee.jpg",
    description: "Equal parts espresso, steamed milk, and velvety milk foam.",
  },
  {
    id: 4,
    name: "Latte",
    category: "Latte",
    price: 8,
    image: "/coffee.jpg",
    description:
      "Smooth espresso blended with creamy steamed milk and a light foam.",
  },
  {
    id: 5,
    name: "Vanilla Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
    description:
      "Classic latte infused with sweet vanilla syrup for a comforting flavor.",
  },
  {
    id: 6,
    name: "Caramel Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
    description:
      "Creamy latte sweetened with rich caramel for a buttery finish.",
  },
  {
    id: 7,
    name: "Mocha",
    category: "Mocha",
    price: 10,
    image: "/coffee.jpg",
    description:
      "Espresso mixed with chocolate and steamed milk for a decadent treat.",
  },
  {
    id: 8,
    name: "White Mocha",
    category: "Mocha",
    price: 11,
    image: "/coffee.jpg",
    description:
      "A creamy blend of espresso, white chocolate, and steamed milk.",
  },
  {
    id: 9,
    name: "Cold Brew",
    category: "Cold Brew",
    price: 8,
    image: "/coffee.jpg",
    description:
      "Slow-steeped coffee served cold with a naturally smooth, refreshing taste.",
  },
  {
    id: 10,
    name: "Iced Americano",
    category: "Cold Brew",
    price: 7,
    image: "/coffee.jpg",
    description:
      "Espresso poured over chilled water and ice for a crisp, bold drink.",
  },
];
