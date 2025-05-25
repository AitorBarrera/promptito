import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import type { PromptSelectVariantProps } from "~/interfaces";

export const PromptSelectVariant = ({
  currentVariant,
  promptVariantes,
  handleChangeVariant,
}: PromptSelectVariantProps) => {
  let index = 0;

  const onChangeSelect = (e: SelectChangeEvent) => {
    console.log(e);

    handleChangeVariant(
      promptVariantes[(e.target.value as unknown as number) - 1],
    );
  };

  const [currentValue, setCurrentValue] = useState("1");
  return (
    <FormControl fullWidth sx={{ color: "primary.main" }}>
      <InputLabel id={`select-label-${++index}`} sx={{ color: "white" }}>
        Variante
      </InputLabel>
      <Select
        labelId={`select-label-${++index}`}
        id={`select-${++index}`}
        label="Variantes"
        sx={{ color: "white" }}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          handleChangeVariant(
            promptVariantes[parseInt(e.target.value, 10) - 1],
          );
        }}
        name={promptVariantes[0].nombre}
        value={currentValue}
      >
        {promptVariantes.map((variante, index) => {
          const value = (index + 1).toString();
          return (
            <MenuItem key={variante.id} value={value} data-value={index}>
              {variante.nombre}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
