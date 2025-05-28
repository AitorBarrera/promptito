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
import { Button, Pagination } from "@mui/material";
import { OrbitProgress } from "react-loading-indicators";
import { LoadingIndicator } from "~/componentes/General/LoadingIndicator";
import { PaginationPrompts } from "~/componentes/Pagination/PaginationPrompts";

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
      `&cantidadPorPagina=${4}`,
  );

  const { datos, cantidadTotal, pagina, cantidadPorPagina, cantidadDePaginas } =
    data == null ? {} : data;

  const [showFilters, setShowFilters] = useState(() =>
    window.innerWidth >= 1024 ? true : false,
  );

  return (
    <>
      <LayoutNavbar />
      <main className="relative flex min-h-[100dvh] flex-col lg:flex-row">
        <div
          className={`filterContainer border-primarylight text-text bg-primaryblack overflow-x-hidden border-b-2 px-4 lg:sticky lg:top-0 lg:bottom-0 lg:max-h-[100dvh] lg:w-[25%] lg:overflow-scroll lg:border-0 ${showFilters ? "block" : "hidden w-[0%] translate-x-[-500px]"}`}
        >
          <h3 className="text-primarywhite font-Tron my-4 text-center text-2xl font-bold">
            FILTROS
          </h3>
          <FilterForm
            filterState={filterState as Filters}
            handleInputChange={onInputChange}
            handleSelectChange={onSelectChange}
          />
        </div>
        <div
          className={
            `relative flex flex-col` + showFilters
              ? "relative w-[100%]"
              : "w-[75%]"
          }
        >
          <button
            className="bg-primaryblack top-0 left-0 z-50 h-10 w-10 cursor-pointer rounded-br-md lg:sticky"
            onClick={() => setShowFilters(!showFilters)}
          >
            <TuneIcon />
          </button>

          <div className="lg:max-w-standard relative mx-auto flex flex-col gap-4 p-2 lg:gap-4">
            {isLoading && (
              <LoadingIndicator text="Puede tardar hasta un minuto (Server API iniciando)" />
            )}
            {hasError && <p>Error al cargar los prompts</p>}
            {data && datos.length === 0 && (
              <h2 className="!text-primaryblack animate__animated animate__pulse mt-8 text-center">
                No hay prompts que cumplan con los filtros
              </h2>
            )}
            {data &&
              datos.map((prompt: Prompt) => (
                <PromptComponente
                  key={prompt.id}
                  prompt={prompt}
                  idClerkUsuarioActual={usuarioEnBBDD?.idClerk ?? ""}
                />
              ))}
          </div>
          <PaginationPrompts
            cantidadDePaginas={cantidadDePaginas}
            actualPage={actualPage}
            setActualPage={setActualPage}
          />
        </div>
      </main>
    </>
  );
}
