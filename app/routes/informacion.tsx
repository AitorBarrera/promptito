import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Informacion" },
    { name: "description", content: "Informacion!" },
  ];
}
export default function Informacion() {
  return (
    <main className="min-h-[100dvh]">
      <LayoutNavbar />
      <div>informacion</div>
    </main>
  );
}
