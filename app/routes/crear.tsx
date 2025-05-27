import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";
import { CreatePromptForm } from "~/componentes/CreatePrompt/CreatePromptForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Crear" },
    { name: "description", content: "Crear!" },
  ];
}

export default function Crear() {
  return (
    <>
      <LayoutNavbar />
      <main className="min-h-[100dvh] p-4">
        <div className="lg:max-w-standard border-primaryblack bg-primaryblack mx-auto flex flex-col gap-4 rounded-2xl border-2 p-6 shadow-xl/30">
          <h2 className="font-Tron text-center !text-2xl">Crear Prompt</h2>
          <CreatePromptForm />
        </div>
      </main>
    </>
  );
}
