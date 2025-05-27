import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useFetch } from "~/hooks";
import type { FilterFormLlmsProps, LLM } from "~/interfaces";
import { LoadingIndicator } from "../General/LoadingIndicator";

export const FilterFormLlms = ({ handleInputChange }: FilterFormLlmsProps) => {
  const { data, isLoading } = useFetch(
    "https://promptitoapi-docker.onrender.com/Llm/dto",
  );

  const llms = data;
  return (
    <div className="form-group flex flex-col gap-2">
      <label>LLM</label>
      {isLoading ? (
        <LoadingIndicator colorHEX="02b59f" />
      ) : (
        <RadioGroup
          name="llms"
          className="llmsFilter grid-cols-2 gap-2 lg:!grid"
        >
          <FormControlLabel
            key={0}
            control={
              <Radio
                name={`idLlm`}
                sx={{ color: "white" }}
                value={""}
                onChange={handleInputChange}
              />
            }
            label={`Ninguno`}
          />
          {llms.map((llm: LLM) => {
            return (
              <FormControlLabel
                key={llm.id}
                control={
                  <Radio
                    name={`idLlm`}
                    sx={{ color: "white" }}
                    value={llm.id}
                    onChange={handleInputChange}
                  />
                }
                label={`${llm.nombre}`}
              />
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};
