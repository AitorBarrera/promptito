import React, { useContext, useEffect, useState } from "react";
import { GenericButton } from "../General/GenericButton";
import type { PromptComponenteProps } from "~/interfaces";
import { UserContext } from "~/contexts/UserContext";
import { PromptUseMenu } from "./PromptUseMenu";
import { IconButton } from "@mui/material";
import { PromptFavouriteButton } from "./PromptFavouriteButton";
import { PromptSelectVariant } from "./PromptSelectVariant";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink } from "react-router";

export const PromptComponente = ({
  prompt,
  idClerkUsuarioActual,
}: PromptComponenteProps) => {
  const usuarioEnBBDD = useContext(UserContext);

  const [showUseMenu, setShowUseMenu] = useState(false);

  const [inFavourites, setInFavourites] = useState(false);

  useEffect(() => {
    setInFavourites(
      prompt.enFavoritosDe.find((usuario) => {
        return usuario.id == usuarioEnBBDD?.id;
      }) != null,
    );
  }, [usuarioEnBBDD]);

  const [currentVariant, setCurrentVariant] = useState(
    prompt.promptVariantes[0],
  );
  return (
    <>
      <div className="promptComponente bg-background border-primarydark text-text animate__animated animate__fadeIn grid grid-cols-8 items-center gap-2 rounded-2xl border-4 p-4 shadow-xl/30 lg:my-6 lg:p-8">
        <h3 className="col-span-8 overflow-hidden text-ellipsis lg:col-span-5">
          {prompt.titulo}
          {/* {prompt.usuarioCreador.idClerk == idClerkUsuarioActual && (
            <NavLink to={"/crear/" + prompt.id} className={"ml-4"}>
              <IconButton color="primary">
                <CreateIcon />
              </IconButton>
            </NavLink>
          )} */}
        </h3>

        <div className="creadoContainer col-span-8 flex gap-6 lg:col-span-3 lg:justify-end">
          <p className="flex items-center gap-2">
            <b className="text-primary">Creado en: </b>
            <span>{new Date(prompt.fechaCreacion).toLocaleDateString()}</span>
          </p>
        </div>

        <div className="temasContainer col-span-8 lg:col-span-5">
          <p className="">
            <b className="text-primary">Tematicas: </b>
            <span>
              {prompt.tematicas.map((tematica) => tematica.nombre).join(", ")}
            </span>
          </p>
        </div>
        <div className="autorContainer col-span-8 lg:col-span-3 lg:text-end">
          <p className="">
            <b className="text-primary">Autor: </b>
            <span>{prompt.usuarioCreador.nombre}</span>
          </p>
        </div>

        <div className="descripcionContainer col-span-8 lg:col-span-5">
          <p className="text-light text-grey max-h-[67px] overflow-y-hidden text-ellipsis">
            {prompt.descripcion}
          </p>
        </div>
        <div className="col-span-8 row-start-2 flex items-center text-end lg:col-span-3 lg:row-start-auto lg:justify-end">
          <PromptFavouriteButton
            idCurrentUser={usuarioEnBBDD?.id}
            idPrompt={prompt.id}
            initialNumberFavourites={prompt.enFavoritosDe.length}
            inFavourites={inFavourites}
            setFavourites={setInFavourites}
          />
        </div>

        <div className="relative col-span-8 lg:px-8">
          <p className="promptTexto text-light relative mx-auto mb-4 flex max-h-[100px] overflow-hidden">
            {currentVariant.textoPrompt}
            <span
              className="from-background pointer-events-none absolute right-0 bottom-0 w-full bg-gradient-to-t to-transparent text-right"
              style={{
                display:
                  currentVariant.textoPrompt.length > 300 ? "block" : "none",
                height: "2em",
              }}
            ></span>
          </p>
        </div>

        <div className="col-span-8 flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex items-center rounded-2xl lg:w-[20%] lg:p-2">
            <PromptSelectVariant
              currentVariant={currentVariant}
              promptVariantes={prompt.promptVariantes}
              handleChangeVariant={setCurrentVariant}
            />
          </div>
          <div className="copyButtonContainer flex justify-center">
            <GenericButton
              key={2}
              text={"Usar prompt"}
              buttonVariant={1}
              iconName="copy"
              onClickHandler={() => setShowUseMenu(!showUseMenu)}
            />
          </div>
        </div>
        {showUseMenu && (
          <div className="col-span-8">
            <PromptUseMenu promptVariant={currentVariant} />
          </div>
        )}
      </div>
    </>
  );
};
