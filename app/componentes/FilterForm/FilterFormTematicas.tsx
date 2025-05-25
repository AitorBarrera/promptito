import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useFetch } from "~/hooks";
import type { FilterFormTematicasProps, Tematica } from "~/interfaces";
import { LoadingIndicator } from "../General/LoadingIndicator";

export const FilterFormTematicas = ({
  handleInputChange,
}: FilterFormTematicasProps) => {
  const { data, isLoading } = useFetch(
    "https://promptitoapi-docker.onrender.com/tematica/dto",
  );

  const tematicas = data;
  return (
    <div className="form-group">
      <label>Tematica</label>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <RadioGroup name="tematicas" className="tematicasFilter">
          <FormControlLabel
            key={0}
            control={
              <Radio
                name={`idPromptTematica`}
                sx={{ color: "white" }}
                value={""}
                onChange={handleInputChange}
              />
            }
            label={`Ninguno`}
          />
          {tematicas.map((tematica: Tematica) => {
            return (
              <FormControlLabel
                key={tematica.id}
                control={
                  <Radio
                    name={`idPromptTematica`}
                    sx={{ color: "white" }}
                    value={tematica.id}
                    onChange={handleInputChange}
                  />
                }
                label={`${tematica.nombre}`}
              />
              // <FormControlLabel
              //   key={tematica.id}
              //   control={
              //     <Checkbox
              //       name={`${tematica.nombre} ${tematica.version}`}
              //       sx={{ color: "white" }}
              //     />
              //   }
              //   label={`${tematica.nombre} ${tematica.version}`}
              // />

              // <label
              // htmlFor={`${tematica.nombre} ${tematica.version}`}
              // key={tematica.id}
              // className="flex items-center justify-between text-start border-b-2 pb-1 border-text">

              //   {`${tematica.nombre} ${tematica.version}`}

              //   <input
              //     type="checkbox"
              //     name="tematica"
              //     className="form-checkbox place-self-start self-center justify-self-start h-[18px] w-[18px] rounded"
              //     id={`${tematica.nombre} ${tematica.version}`}
              //     value={`${tematica.nombre} ${tematica.version}`}
              //   />
              // </label>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};
