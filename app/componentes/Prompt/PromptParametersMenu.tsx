import React from "react";
import type { PromptParametersMenuProps } from "~/interfaces";
import { ReplaceWithespace } from "~/services/Functions";

export const PromptParametersMenu = ({
  promptVariantWithParameters,
}: PromptParametersMenuProps) => {
  return promptVariantWithParameters?.parametros?.map((parametro) => {
    const parameterNameWithoutSpaces = ReplaceWithespace(parametro.nombre);
    return (
      <div key={parametro.id} className="flex flex-col gap-2">
        <label
          htmlFor={parametro.nombre}
          className="text-sm font-semibold capitalize"
        >
          {parametro.nombre}
        </label>
        {parametro.tipoValor === "string" && (
          <textarea
            id={parameterNameWithoutSpaces}
            name={parametro.nombre}
            required
            defaultValue={parametro.valorPredeterminado || ""}
            className="border-primarylight rounded-lg border p-2"
          />
        )}
        {parametro.tipoValor === "number" && (
          <input
            type="number"
            id={parameterNameWithoutSpaces}
            name={parametro.nombre}
            required
            defaultValue={parametro.valorPredeterminado || ""}
            className="border-primarylight rounded-lg border p-2"
          />
        )}
        {parametro.tipoValor === "listaOpciones" && (
          <select
            id={parameterNameWithoutSpaces}
            name={parametro.nombre}
            defaultValue={parametro.valorPredeterminado || ""}
            className="border-primarylight rounded-lg border p-2"
          >
            {parametro.opcionParametros?.map((opcion) => (
              <option
                key={opcion.id}
                value={opcion.valor}
                className="bg-primaryblack p-2"
              >
                {opcion.valor}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  });
};
