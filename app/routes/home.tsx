import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kissa Mori" },
    { name: "description", content: "Welcome to Kissa Mori Café!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Kissa Mori</h1>
    </div>
  );
}
