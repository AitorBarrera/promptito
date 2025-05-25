import { useUser } from "@clerk/clerk-react";
import { UserContext } from "./UserContext";
import type { Usuario, UsuarioPost } from "~/interfaces";
import { addUser, getUserByIdClerk } from "~/services/Promptito_API";
import { useEffect, useState } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, user } = useUser();

  const [usuarioEnBBDD, setUsuarioEnBBDD] = useState<Usuario | null>(null);

  useEffect(() => {
    if (isLoaded && user != undefined) {
      const id = user?.id;

      getUserByIdClerk(id).then((response) => {
        setUsuarioEnBBDD(response);

        if (response == null) {
          console.log("Usuario no existe en la BBDD");
          const username = user?.username;
          const imageUrl = user?.imageUrl;
          const email = user?.emailAddresses?.[0]?.emailAddress;

          const nuevoUsuario: UsuarioPost = {
            nombre: username ?? "",
            email: email ?? "",
            passwordHash: "",
            avatarUrl: imageUrl ?? "",
            idClerk: id ?? "",
            estaActivo: true,
          };

          addUser(nuevoUsuario).then((response) => console.log(response));
          getUserByIdClerk(id).then((response) => {
            setUsuarioEnBBDD(response);
          });
        }
      });
    }
  }, [isLoaded]);

  return (
    <>
      <UserContext.Provider value={usuarioEnBBDD}>
        {children}
      </UserContext.Provider>
    </>
  );
};
