import React, { useContext, useEffect, useState } from "react";
import { GenericButton } from "../General/GenericButton";
import { Icon } from "../General/Icon";
import type { PromptComponenteProps } from "~/interfaces";
import { addFavourite } from "~/services/Promptito_API";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { UserContext } from "~/contexts/UserContext";
import { PromptUseMenu } from "./PromptUseMenu";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
      <div className="promptComponente bg-background border-primarydark text-text my-6 grid grid-cols-8 items-center gap-2 rounded-2xl border-2 p-[2rem]">
        <h3 className="col-span-5 overflow-hidden text-ellipsis">
          {prompt.titulo}
          {prompt.usuarioCreador.idClerk == idClerkUsuarioActual && (
            <NavLink to={"/crear/" + prompt.id} className={"ml-4"}>
              <IconButton color="primary">
                <CreateIcon />
              </IconButton>
            </NavLink>
          )}
        </h3>

        <div className="creadoContainer col-span-3 flex justify-end gap-6">
          <p className="flex items-center gap-2">
            <b className="text-primary">Creado en: </b>
            <span>{prompt.fechaCreacion}</span>
          </p>
        </div>

        <div className="temasContainer col-span-5">
          <p className="">
            <b className="text-primary">Tematicas: </b>
            <span>
              {prompt.tematicas.map((tematica) => tematica.nombre).join(", ")}
            </span>
          </p>
        </div>
        <div className="autorContainer col-span-3 text-end">
          <p className="">
            <b className="text-primary">Autor: </b>
            <span>{prompt.usuarioCreador.nombre}</span>
          </p>
        </div>

        <div className="descripcionContainer col-span-5">
          <p className="text-light text-grey max-h-[67px] overflow-y-hidden text-ellipsis">
            {prompt.descripcion}
          </p>
        </div>
        <div className="col-span-3 flex items-center justify-end text-end">
          <PromptFavouriteButton
            idCurrentUser={usuarioEnBBDD?.id}
            idPrompt={prompt.id}
            initialNumberFavourites={prompt.enFavoritosDe.length}
            inFavourites={inFavourites}
            setFavourites={setInFavourites}
          />
        </div>
        {/* <div className="promptTextoSombra bg-linear-to-b from-transparent from-80% to-black z-10 absolute h-[100%] w-[100%] "> </div> */}
        <p className="promptTexto text-light relative col-span-8 mx-auto my-4 max-h-[100px] overflow-hidden px-8 text-justify text-ellipsis">
          {currentVariant.textoPrompt}
        </p>
        <div className="col-span-8 flex justify-between">
          <div className="flex w-[20%] items-center rounded-2xl p-2">
            <PromptSelectVariant
              currentVariant={currentVariant}
              promptVariantes={prompt.promptVariantes}
              handleChangeVariant={setCurrentVariant}
            />
          </div>
          <div className="copyButtonContainer flex">
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
