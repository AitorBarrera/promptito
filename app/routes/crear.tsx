import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";
import { CreatePromptForm } from "~/componentes/CreatePrompt/CreatePromptForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Promptito - Crear" }, { name: "Crear", content: "Crear!" }];
}

export default function Crear() {
  return (
    <>
      <LayoutNavbar />
      <main className="min-h-[100dvh] pt-12">
        <div className="lg:max-w-standard border-primaryblack bg-primaryblack mx-auto flex flex-col gap-4 rounded-2xl border-2 p-8 shadow-xl/30">
          <h2 className="font-Tron text-center !text-xl lg:!text-6xl">
            Crear Prompt
          </h2>
          <CreatePromptForm />
        </div>
      </main>
    </>
  );
}
