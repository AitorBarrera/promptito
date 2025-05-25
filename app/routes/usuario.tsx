import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import type { Route } from "./+types/home";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserProfile,
  useSignUp,
  useUser,
} from "@clerk/clerk-react";
import { useContext } from "react";
import type { Usuario, UsuarioPost } from "~/interfaces";
import { UserContext } from "~/contexts/UserContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Usuario" },
    { name: "description", content: "Usuario!" },
  ];
}

export default function Usuario() {
  return (
    <main className="flex min-h-[100dvh] flex-col">
      <LayoutNavbar />
      <div className="flex flex-grow items-center justify-center">
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          <UserProfile />
        </SignedIn>
      </div>
    </main>
  );
}
