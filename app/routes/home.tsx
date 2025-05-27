import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";
import { Logo } from "~/componentes/General/Logo";
import { GenericButton } from "~/componentes/General/GenericButton";
import { Link } from "react-router-dom";
import { getAllPrompts } from "~/services/Promptito_API";
import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { LoginButton } from "~/componentes/General/LoginButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Home" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function Home() {
  return (
    <main className="homePage animate__fadeIn animate__animated mx-auto flex min-h-[100dvh] flex-col">
      <div className="text-text absolute top-0 right-2 py-8 lg:right-10">
        <UserButton />
      </div>
      <div className="lg:max-w-standard flex flex-grow flex-col items-center justify-evenly p-2 lg:mx-auto lg:flex-row lg:justify-evenly">
        <div className="my-8 w-[70%] lg:w-[35%]">
          <Logo />
        </div>
        <div className="bg-primaryblack rounded-3xl p-8 text-center shadow-xl/30">
          <p className="font-weight-bold font-Tron text-primary lg:text-h1 mb-4 text-2xl">
            PROMPTITO
          </p>
          <p className="font-weight-bold text-primary lg:text-h3 mb-8 text-xl">
            <b>Repositorio de prompts para LLMs</b>
          </p>
          <p className="text-text mb-8">
            Encuentra y comparte prompts para IA de manera fácil y rápida.
          </p>
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <SignedOut>
              <SignInButton>
                <div>
                  <LoginButton
                    text="Iniciar Sesion"
                    buttonVariant={1}
                    iconName="user"
                  />
                </div>
              </SignInButton>
            </SignedOut>
            <Link to="/explorar">
              <GenericButton
                text="Explorar Prompts"
                onClickHandler={() => {}}
                buttonVariant={1}
                iconName="search"
              />
            </Link>
            <Link to="/crear">
              <GenericButton
                text="Crear Prompt"
                onClickHandler={() => {}}
                buttonVariant={1}
                iconName="pencil"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
