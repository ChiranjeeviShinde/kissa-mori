import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("loading", "./routes/loading.tsx"),
  route("coffee/:id", "routes/coffee.$id.tsx"),
] satisfies RouteConfig;
