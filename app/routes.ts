import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("loading", "./routes/loading.tsx"),
  route("coffee/:id", "./routes/coffee.$id.tsx"),
  route("table/:id", "./routes/table.$id.tsx"),
  route("api/auth/*", "./routes/api.auth.ts"),
  route("api/tables", "./routes/api.tables.ts"),
  route(
    "api/table/:tableId/cart/:coffeeId",
    "./routes/api.table.$tableId.cart.$coffeeId.ts",
  ),
  route("api/table/:tableId/cart", "./routes/api.table.$tableId.cart.ts"),
  route(
    "api/table/:tableId/cart/:coffeeId/remove",
    "./routes/api.table.$tableId.cart.$coffeeId.remove.ts",
  ),

  route(
    "api/table/:tableId/cart/:coffeeId/delete",
    "./routes/api.table.$tableId.cart.$coffeeId.delete.ts",
  ),
  route("table/:id/checkout", "./routes/checkout.tsx"),
  route(
    "api/table/:tableId/checkout",
    "./routes/api.table.$tableId.checkout.ts",
  ),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
