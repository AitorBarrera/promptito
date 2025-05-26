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
    <main className="homePage mx-auto flex h-[100dvh] flex-col px-[6%]">
      <div className="text-text absolute top-0 right-2 py-8 lg:right-10">
        <UserButton />
      </div>
      <div className="flex flex-grow flex-col items-center justify-around lg:flex-row lg:justify-between">
        <div className="w-[75%] lg:w-[35%]">
          <Logo />
        </div>
        <div className="bg-primaryblack rounded-3xl p-16 text-center">
          <h1 className="text-h1 font-weight-bold text-text font-Tron mb-2">
            PROMPTITO
          </h1>
          <h3 className="text-h2 font-weight-bold text-primarylight mb-2">
            Repositorio de prompts para IA
          </h3>
          <p className="text-text mb-12">
            Encuentra y comparte prompts para IA de manera fácil y rápida.
          </p>
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <SignedOut>
              <SignInButton>
                <LoginButton
                  text="Iniciar Sesion"
                  buttonVariant={1}
                  iconName="user"
                />
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
