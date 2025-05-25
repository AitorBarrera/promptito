import { Button } from "@mui/material";
import React, { useEffect, useState, type FormEvent } from "react";
import type { PromptUseMenuProps, PromptVariante } from "~/interfaces";
import { ReplaceWithespace } from "~/services";
import { getPromptVariantById } from "~/services/Promptito_API";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const PromptUseMenu = ({ promptVariant }: PromptUseMenuProps) => {
  const [promptVariantWithParameters, setPromptVariantWithParameters] =
    useState<PromptVariante | null>(null);

  const [generatedText, setGeneratedText] = useState(promptVariant.textoPrompt);

  const [showGeneratedText, setShowGeneratedText] = useState(false);
  const [showChatAI, setShowChatAI] = useState(false);
  useEffect(() => {
    const fetchPromptVariant = async () => {
      const response = await getPromptVariantById(promptVariant.id);
      return response;
    };

    fetchPromptVariant().then((data) => setPromptVariantWithParameters(data));
  }, [promptVariant]);

  const replacingParameters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let textPromptToChange = promptVariantWithParameters?.textoPrompt || "";

    promptVariantWithParameters?.parametros?.forEach((parametro) => {
      let input = document.querySelector(
        `.formParameters #${parametro.nombre.replace(/\s+/g, "_")}`,
      ) as HTMLInputElement;

      textPromptToChange = textPromptToChange.replace(
        new RegExp(`{{Parametro: ${parametro.nombre}}}`, "g"),
        input.value,
      );
    });

    setShowGeneratedText(true);
    setGeneratedText(textPromptToChange);
  };

  const testAi = () => {
    setShowChatAI(true);
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="flex flex-col gap-2">
      <hr className="text-grey my-6 rounded-3xl border-1" />
      <h4 className="my-8 text-center text-lg font-bold">
        Modificar parametros
      </h4>
      <div className="grid grid-cols-5 gap-20">
        <div className="col-span-3 flex flex-col gap-8">
          <h4 className="text-center">Prompt modificado:</h4>
          <p className="bg-primarydark w-full flex-grow rounded-2xl p-8">
            {generatedText}
          </p>
          {showGeneratedText && (
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => navigator.clipboard.writeText(generatedText)}
              >
                Copiar Prompt
              </Button>
              <Button
                variant="outlined"
                startIcon={<SmartToyIcon />}
                onClick={() => testAi()}
              >
                Preguntar a IA
              </Button>
            </div>
          )}
        </div>
        <form
          className="formParameters col-span-2 col-start-4 flex flex-col justify-between gap-8"
          onSubmit={replacingParameters}
        >
          <h4 className="text-center">Parametros:</h4>
          {promptVariantWithParameters?.parametros?.map((parametro) => {
            const parameterNameWithoutSpaces = ReplaceWithespace(
              parametro.nombre,
            );
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
          })}
          <Button type="submit" variant="contained">
            Generar Prompt
          </Button>
        </form>
      </div>
      {showChatAI && (
        <div className="chatContainer my-8 flex justify-center">
          <iframe
            id="embed-preview-iframe"
            loading="eager"
            src="https://embed.pickaxeproject.com/axe?id=PromptitoAI_15JQ8&mode=embed_gold&host=beta&theme=dark&opacity=100&font_header=Roboto+Mono&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=08090B&c_ff=08090B&c_fbd=FFFFFF&c_rb=7F7F7F&c_bb=FFFFFF&c_bt=000000&c_t=FFFFFF&s_ffo=100&s_rbo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=0.5&s_to=2&s_r=2&prompt=Hola%20mundo"
            width="100%"
            height="500px"
            className="transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0px_rgba(0,0,0,0.15)]"
            style={{
              border: "2px solid rgba(0, 0, 0, 1)",
              transition: ".3s",
              borderRadius: "4px",
              maxWidth: "700px",
            }}
          ></iframe>
          <div id="pickaxe-inline-PromptitoAI_15JQ8"></div>
        </div>
      )}
    </div>
  );
};
