import {
  Button,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "~/hooks";
import type {
  CreateParameterPromptProps,
  Parametro,
  TipoParametro,
} from "~/interfaces";
import { ReplaceWithespace } from "~/services";

export const CreateParameterPrompt = ({
  parameterName,
}: CreateParameterPromptProps) => {
  const parameterNameWithoutSpaces = ReplaceWithespace(parameterName);

  const [tipoValor, setTipoValor] = useState("string");

  return (
    <FormGroup className="text-text parameterForm my-8 flex !grid-cols-7 flex-col items-center gap-8 lg:!grid lg:gap-12">
      <h4>{parameterName}</h4>
      <Select
        id={`tipoValor-${parameterNameWithoutSpaces}`}
        variant="outlined"
        className="col-span-2 w-full"
        value={tipoValor}
        name={`tipoValor-${parameterNameWithoutSpaces}`}
        onChange={(e) => setTipoValor(e.target.value)}
      >
        <MenuItem value={"string"}>Texto</MenuItem>
        <MenuItem value={"number"}>Numero</MenuItem>
        <MenuItem value={"listaOpciones"}>Lista de opciones</MenuItem>
      </Select>
      <TextField
        id={`valorPredeterminado-${parameterNameWithoutSpaces}`}
        label="Valor por defecto (opcional)"
        name={`valorPredeterminado-${parameterNameWithoutSpaces}`}
        defaultValue={""}
        variant="outlined"
        className="col-span-2 w-full"
      />
      {tipoValor == "listaOpciones" && (
        <FormGroup className="col-span-2 w-full">
          <TextField
            id={`opciones-${parameterNameWithoutSpaces}`}
            label="Opciones (separadas por comas)"
            variant="outlined"
            name={`opciones-${parameterNameWithoutSpaces}`}
            required={true}
            defaultValue={""}
          />
        </FormGroup>
      )}
    </FormGroup>
  );
};
