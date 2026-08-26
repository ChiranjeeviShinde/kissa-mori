import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kissa Mori" },
    { name: "description", content: "Welcome to Kissa Mori Café!" },
  ];
}

export default function Home() {
  return <p>Welcome to Kissa Mori!</p>;
}
