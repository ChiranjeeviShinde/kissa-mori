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
    name: "Espresso",
    category: "Espresso",
    price: 5,
    image: "/coffee.jpg",
    description:
      "A rich, concentrated shot of coffee with a bold aroma and smooth crema.",
  },
  {
    name: "Double Espresso",
    category: "Espresso",
    price: 6,
    image: "/coffee.jpg",
    description:
      "Two shots of espresso for a stronger, fuller coffee experience.",
  },
  {
    name: "Cappuccino",
    category: "Cappuccino",
    price: 7,
    image: "/coffee.jpg",
    description: "Equal parts espresso, steamed milk, and velvety milk foam.",
  },
  {
    name: "Latte",
    category: "Latte",
    price: 8,
    image: "/coffee.jpg",
    description:
      "Smooth espresso blended with creamy steamed milk and a light foam.",
  },
  {
    name: "Vanilla Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
    description:
      "Classic latte infused with sweet vanilla syrup for a comforting flavor.",
  },
  {
    name: "Caramel Latte",
    category: "Latte",
    price: 9,
    image: "/coffee.jpg",
    description:
      "Creamy latte sweetened with rich caramel for a buttery finish.",
  },
  {
    name: "Mocha",
    category: "Mocha",
    price: 10,
    image: "/coffee.jpg",
    description:
      "Espresso mixed with chocolate and steamed milk for a decadent treat.",
  },
  {
    name: "White Mocha",
    category: "Mocha",
    price: 11,
    image: "/coffee.jpg",
    description:
      "A creamy blend of espresso, white chocolate, and steamed milk.",
  },
  {
    name: "Cold Brew",
    category: "Cold Brew",
    price: 8,
    image: "/coffee.jpg",
    description:
      "Slow-steeped coffee served cold with a naturally smooth, refreshing taste.",
  },
  {
    name: "Iced Americano",
    category: "Cold Brew",
    price: 7,
    image: "/coffee.jpg",
    description:
      "Espresso poured over chilled water and ice for a crisp, bold drink.",
  },
];
