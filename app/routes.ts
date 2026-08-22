import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("loading", "./routes/loading.tsx"),
  route("coffee/:id", "./routes/coffee.$id.tsx"),
  route("api/coffee/:id/cart", "./routes/api.coffee.$id.cart.ts"),
  route("api/coffee/:id/cart/remove", "./routes/api.coffee.$id.cart.remove.ts"),
  route("api/coffee/:id/cart/delete", "./routes/api.coffee.$id.cart.delete.ts"),
] satisfies RouteConfig;
