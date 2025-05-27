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
    <>
      <LayoutNavbar />
      <main className="min-h-[100dvh] p-4">
        <div className="lg:max-w-standard animate__fadeIn animate__animated bg-primaryblack flex flex-col gap-12 rounded-3xl p-8 pb-12 text-center lg:mx-auto">
          <h1 className="my-8 text-center !text-4xl lg:!text-6xl">
            Información
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
