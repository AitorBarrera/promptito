import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { ToggleButton } from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "~/componentes/General/Icon";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const LayoutNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className="bg-primaryblack sticky top-0 z-1 w-full lg:static">
      <div
        className={`text-text border-bottom-2 border-primarydark relative mx-auto flex items-center justify-between gap-8 border-b-2 px-[4%] py-4 lg:flex-row lg:gap-24 lg:border-0${!showNavbar ? "flex-row-reverse" : "bg-primaryblack flex-col"}`}
      >
        {showNavbar && (
          <div className="flex flex-grow flex-col items-center justify-evenly gap-8 lg:flex-row">
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
        )}
        <NavLink
          to="/usuario"
          className={({ isActive }) =>
            isActive
              ? "text-primary border-primary sticky flex h-full items-center border-b-2 pb-2 lg:static lg:place-self-end"
              : "sticky flex items-center lg:static lg:place-self-end"
          }
        >
          <SignedOut>
            <Icon iconName={"user"} margin_right={20} />
            Login
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
        <ToggleButton
          value="check"
          selected={showNavbar}
          onChange={() => setShowNavbar((prevSelected) => !prevSelected)}
          className={`!bg-primaryblack !text-text !border-text !rounded-full !border-2 lg:!hidden ${showNavbar ? "" : "rotate-180"}`}
        >
          <ArrowUpwardIcon />
        </ToggleButton>
      </div>
      <Outlet />
    </div>
  );
};
