import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito - Informacion" },
    { name: "Informacion", content: "Informacion!" },
  ];
}
export default function Informacion() {
  return (
    <>
      <LayoutNavbar />
      <main className="flex min-h-[100dvh] flex-col pt-12">
        <div className="lg:max-w-standard animate__fadeIn animate__animated bg-primaryblack flex flex-col gap-12 rounded-3xl p-8 pb-12 text-center shadow-xl/30 lg:mx-auto lg:p-16">
          <h1 className="font-Tron my-3 text-center !text-xl lg:!text-6xl">
            Informacion
          </h1>
          <div>
            <h3>¿Qué es promptito?</h3>
            <p>
              Promptito es una plataforma que te permite crear, descubrir y
              compartir prompts.
            </p>
          </div>
          <div>
            <h3> ¿Qué es un Prompt?</h3>
            <p>
              Un prompt es una instrucción o pregunta que se le da a una IA para
              que realice una tarea específica.
            </p>
          </div>
          <div>
            <h3> ¿Qué es un Prompt parametrizado?</h3>
            <p>
              Es un prompt al cual se le pueden modificar partes predefinidas
              para concretar más el resultado que se desea obtener.
            </p>
          </div>
          <div>
            <h3>¿Qué es un LLM?</h3>
            <p>
              Un LLM es un modelo de lenguaje que se utiliza para generar texto.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
