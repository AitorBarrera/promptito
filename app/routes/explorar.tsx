import { useFetcher } from "react-router";
import type { Route } from "./+types/home";
import { PromptComponente } from "~/componentes/Prompt/PromptComponente";
import { LayoutNavbar } from "~/layouts/LayoutNavbar";
import { useFetch, useForm } from "~/hooks";
import type { Prompt, Filters } from "~/interfaces";
import { FilterForm } from "~/componentes/FilterForm/FilterForm";
import { useContext, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { UserContext } from "~/contexts/UserContext";
import { Button } from "@mui/material";
import { OrbitProgress } from "react-loading-indicators";
import { LoadingIndicator } from "~/componentes/General/LoadingIndicator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promptito Explorar" },
    { name: "description", content: "Explorar!" },
  ];
}

const initialFilters: Filters = {
  tituloPrompt: "",
  nombreAutor: "",
  contenidoPrompt: "",
  orderBy: "",
  idLlm: null,
  idPromptTematica: null,
  idUsuarioFavorito: null,
  esFavorito: false,
};

export default function Explorar() {
  const usuarioEnBBDD = useContext(UserContext);
  const [actualPage, setActualPage] = useState(1);

  const {
    filterState,
    onInputChange,
    onSelectChange,
    onResetFilter,
    tituloPrompt,
    nombreAutor,
    contenidoPrompt,
    orderBy,
    idLlm,
    idPromptTematica,
    idUsuarioFavorito,
    esFavorito,
  } = useForm(initialFilters);

  const { data, isLoading, hasError } = useFetch(
    `https://promptitoapi-docker.onrender.com/Prompt/paginacionFiltrado` +
      `?tituloPrompt=${tituloPrompt}` +
      `&nombreAutor=${nombreAutor}` +
      `&contenidoPrompt=${contenidoPrompt}` +
      `&orderBy=${orderBy}` +
      `&idLlm=${idLlm ?? ""}` +
      `&idPromptTematica=${idPromptTematica ?? ""}` +
      `&idUsarioFavorito=${usuarioEnBBDD?.id ?? ""}` +
      `&esFavorito=${esFavorito}` +
      `&pagina=${actualPage}` +
      `&cantidadPorPagina=${3}`,
  );

  const { datos, cantidadTotal, pagina, cantidadPorPagina, cantidadDePaginas } =
    data == null ? {} : data;

  const [showFilters, setShowFilters] = useState(true);

  return (
    <main className="relative flex min-h-[100dvh]">
      <div
        className={`filterContainer text-text bg-primaryblack sticky top-0 bottom-0 max-h-[100dvh] w-[25%] overflow-scroll overflow-x-hidden px-12 ${showFilters ? "block" : "hidden w-[0%] translate-x-[-500px]"}`}
      >
        <h3 className="text-primarywhite font-Tron my-4 text-center text-2xl font-bold">
          PROMPTITO
        </h3>
        <FilterForm
          filterState={filterState as Filters}
          handleInputChange={onInputChange}
          handleSelectChange={onSelectChange}
        />
      </div>
      <div
        className={
          `relative flex flex-col pb-20` + showFilters
            ? "w-[100%] pb-20"
            : "w-[75%]"
        }
      >
        <LayoutNavbar />

        <button
          className="bg-primaryblack sticky top-0 left-0 z-50 h-10 w-10 cursor-pointer rounded-br-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <TuneIcon />
        </button>

        <div className="max-w-standard relative mx-auto flex flex-col gap-4">
          {isLoading && <LoadingIndicator />}
          {hasError && <p>Error al cargar los prompts</p>}
          {data &&
            datos.map((prompt: Prompt) => (
              <PromptComponente
                key={prompt.id}
                prompt={prompt}
                idClerkUsuarioActual={usuarioEnBBDD?.idClerk ?? ""}
              />
            ))}
        </div>
        <div className="absolute right-0 bottom-0 flex w-[500px] items-center justify-end gap-4 p-4">
          {Array.from({ length: cantidadDePaginas }, (_, i) => (
            <button
              key={i}
              className={`${
                actualPage === i + 1
                  ? "bg-primary text-primaryblack"
                  : "bg-primaryblack text-primarywhite"
              } h-10 w-10 cursor-pointer rounded-md`}
              onClick={() => {
                setActualPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
