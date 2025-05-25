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
    <main className="max-w-landingPage mx-auto flex h-[100dvh] flex-col">
      <div className="text-text absolute top-0 right-10 py-8">
        <UserButton
          showName={true}
          appearance={{
            elements: {
              userButtonBox: "text-text ",
              userButtonOuterIdentifier: "!text-[16px]",
            },
          }}
        />
      </div>
      <div className="flex flex-grow flex-col items-center justify-between xl:flex-row">
        <div className="w-[35%]">
          <Logo />
        </div>
        <div className="bg-primaryblack rounded-3xl p-16 text-center">
          <h1 className="text-h1 font-weight-bold text-text font-Tron mb-2">
            PROMPTITO
          </h1>
          <h2 className="text-h2 font-weight-bold text-primarylight mb-2">
            Papua nueva guinea
          </h2>
          <p className="text-text mb-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <div className="flex justify-between gap-4">
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
