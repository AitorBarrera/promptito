import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "~/componentes/General/Icon";

export const LayoutNavbar = () => {
  const { user } = useUser();

  return (
    <div className="">
      <div className="text-text border-bottom-2 bg-navbar relative mx-auto flex items-center justify-between gap-24 px-[6%] py-4">
        <div className="flex flex-grow items-center justify-evenly gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b-2 pb-2" : ""
            }
          >
            <Icon iconName={"house"} margin_right={20} />
            Inicio
          </NavLink>

          <NavLink
            to="/explorar"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b-2 pb-2" : ""
            }
          >
            <Icon iconName={"search"} margin_right={20} />
            Explorar
          </NavLink>

          <NavLink
            to="/crear"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b-2 pb-2" : ""
            }
          >
            <Icon iconName={"pencil"} margin_right={20} />
            Crear
          </NavLink>

          <NavLink
            to="/informacion"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b-2 pb-2" : ""
            }
          >
            <Icon iconName={"info"} margin_right={20} />
            Saber mas
          </NavLink>
        </div>
        <NavLink
          to="/usuario"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-primary flex h-full items-center place-self-end border-b-2 pb-2"
              : "flex items-center place-self-end py-4"
          }
        >
          <SignedOut>
            <Icon iconName={"user"} margin_right={20} />
            Usuario
          </SignedOut>
          <SignedIn>
            <div className="align-items flex gap-4">
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "text-text !flex-row-reverse",
                    userButtonOuterIdentifier: "!text-[16px]",
                  },
                }}
              />
            </div>
          </SignedIn>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
