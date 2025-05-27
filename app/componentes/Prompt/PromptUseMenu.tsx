import { Button } from "@mui/material";
import React, { useEffect, useState, type FormEvent } from "react";
import type { PromptUseMenuProps, PromptVariante } from "~/interfaces";
import { ReplaceWithespace } from "~/services";
import { getPromptVariantById } from "~/services/Promptito_API";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useToast } from "~/hooks/useToast";
import { PromptParametersMenu } from "./PromptParametersMenu";

export const PromptUseMenu = ({ promptVariant }: PromptUseMenuProps) => {
  const [promptVariantWithParameters, setPromptVariantWithParameters] =
    useState<PromptVariante | null>(null);

  const [generatedText, setGeneratedText] = useState(promptVariant.textoPrompt);
  const { notify, ToastContainer } = useToast();

  const [showGeneratedText, setShowGeneratedText] = useState(false);
  const [showChatAI, setShowChatAI] = useState(false);

  useEffect(() => {
    const fetchPromptVariant = async () => {
      const response = await getPromptVariantById(promptVariant.id || 0);
      console.log(response.parametros);

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
    setShowChatAI((prev) => !prev);
    navigator.clipboard.writeText(generatedText);
    notify("Prompt copiado al portapapeles", "success");
  };

  return (
    <div className="flex flex-col gap-2">
      <hr className="text-grey my-6 rounded-3xl border-1" />
      <h4 className="mb-8 text-center text-lg font-bold lg:my-8">
        {promptVariantWithParameters?.parametros?.length != 0
          ? "Modificar parametros"
          : `Prompt sin parametros`}
      </h4>
      <div className="flex grid-cols-5 flex-col-reverse gap-10 lg:grid lg:gap-20">
        <div
          className={`${promptVariantWithParameters?.parametros?.length != 0 ? "col-span-3" : "col-span-5"} flex flex-col gap-6 lg:gap-8`}
        >
          <h4 className="text-center">
            {promptVariantWithParameters?.parametros?.length == 0
              ? "Texto:"
              : !showGeneratedText
                ? "Prompt sin modificar:"
                : "Prompt modificado:"}
          </h4>
          <p className="bg-primarydark w-full flex-grow rounded-2xl p-8">
            {generatedText}
          </p>
          {(showGeneratedText ||
            promptVariantWithParameters?.parametros?.length == 0) && (
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(generatedText);
                  notify("Prompt copiado al portapapeles", "success");
                }}
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
        {promptVariantWithParameters?.parametros?.length != 0 && (
          <form
            className="formParameters col-span-2 col-start-4 flex flex-col justify-between gap-8"
            onSubmit={replacingParameters}
          >
            <h4 className="text-center">Parametros:</h4>
            <PromptParametersMenu
              promptVariantWithParameters={promptVariantWithParameters}
            />
            <Button type="submit" variant="contained">
              Generar Prompt con parametros
            </Button>
          </form>
        )}
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
            }}
          ></iframe>
          <div id="pickaxe-inline-PromptitoAI_15JQ8"></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
