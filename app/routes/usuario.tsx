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
      <div className="animate__fadeIn animate__animated flex flex-grow items-center justify-center p-4">
        <SignedOut>
          <SignIn
          // appearance={{
          //   variables: {
          //     colorPrimary: "#022422",
          //     colorText: "#022422",
          //     colorTextSecondary: "#022422",
          //     colorBackground: "#ffffff",
          //   },
          // }}
          />
        </SignedOut>
        <SignedIn>
          <UserProfile />
        </SignedIn>
      </div>
    </main>
  );
}
