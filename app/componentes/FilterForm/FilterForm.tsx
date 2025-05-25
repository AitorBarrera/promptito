import "./FilterFormStyle.css";
import type { FilterFormProps, LLM } from "~/interfaces";
import { FilterFormLlms } from "./FilterFormLlms";
import { FilterFormTematicas } from "./FilterFormTematicas";
import { FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";
import { SignedIn } from "@clerk/clerk-react";

export const FilterForm = ({
  filterState,
  handleInputChange,
  handleSelectChange,
}: FilterFormProps) => {
  const { tituloPrompt, nombreAutor, contenidoPrompt, esFavorito } =
    filterState;

  return (
    <form action="">
      <div className="flex flex-col gap-2">
        <div className="form-group">
          <label htmlFor="orderBy">Ordenado por:</label>
          <select name="orderBy" id="orderBy" onChange={handleSelectChange}>
            <option value="fechaDesc">Fecha descendente</option>
            <option value="fechaAsc">Fecha ascendente</option>
            <option value="tituloDesc">Titulo descendente</option>
            <option value="tituloAsc">Titulo ascendente</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tituloPrompt">Titulo del prompt:</label>
          <input
            type="text"
            name="tituloPrompt"
            value={tituloPrompt ?? ""}
            id="titulo"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombreAutor">Nombre de autor:</label>
          <input
            type="text"
            name="nombreAutor"
            value={nombreAutor ?? ""}
            id="nombreAutor"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenidoPrompt">Contenido del prompt:</label>
          <textarea
            name="contenidoPrompt"
            id="contenidoPrompt"
            value={contenidoPrompt ?? ""}
            onChange={handleInputChange}
          />
        </div>

        <SignedIn>
          <FormControlLabel
            control={
              <Switch
                sx={{ color: "white", backgroundImage: "white" }}
                onChange={handleInputChange}
                name="esFavorito"
                checked={esFavorito ?? false}
              />
            }
            label="Favoritos"
          />
        </SignedIn>
        <FilterFormLlms handleInputChange={handleInputChange} />

        <FilterFormTematicas handleInputChange={handleInputChange} />
      </div>
    </form>
  );
};
