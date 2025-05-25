import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("explorar", "./routes/explorar.tsx"),
  route("crear", "./routes/crear.tsx"),
  route("informacion", "./routes/informacion.tsx"),
  route("usuario", "./routes/usuario.tsx"),
] satisfies RouteConfig;
