import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";
import { SignedIn, SignedOut, SignIn, UserProfile } from "@clerk/clerk-react";
import type { Usuario } from "~/interfaces";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Usuario" },
    { name: "Usuario", content: "Usuario!" },
  ];
}

export default function Usuario() {
  return (
    <main className="flex min-h-[100dvh] flex-col">
      <LayoutNavbar />
      <div className="animate__fadeIn animate__animated flex flex-grow items-center justify-center p-4">
        <SignedOut>
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#02b59f",
                colorText: "#b7e2dd",
                // colorTextSecondary: "#596d6b",
                colorBackground: "#1a1d1d",
              },
            }}
          />
        </SignedOut>
        <SignedIn>
          <UserProfile />
        </SignedIn>
      </div>
    </main>
  );
}
