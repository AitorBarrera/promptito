import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import "./CreatePromptFormStyle.css";
import {
  addPromptConNavegacion,
  getAllLLMs,
  getAllTematicas,
  ReplaceWithespace,
} from "~/services";
import type {
  LLM,
  Parametro,
  PromptConNavegacion,
  Tematica,
  TipoParametro,
} from "~/interfaces";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "~/hooks";
import { CreateParameterPrompt } from "./CreateParameterPrompt";
import { UserContext } from "~/contexts/UserContext";
import { PromptComponente } from "../Prompt/PromptComponente";
import { useToast } from "~/hooks/useToast";
import { useNavigate } from "react-router";

export const CreatePromptForm = () => {
  const navigate = useNavigate();
  const { notify, ToastContainer } = useToast();
  const usuarioEnBBDD = useContext(UserContext);

  const [llms, setLlms] = useState<LLM[]>([]);
  const [tematicas, setTematicas] = useState<Tematica[]>([]);

  useEffect(() => {
    getAllLLMs().then((data) => setLlms(data));
    getAllTematicas().then((data) => setTematicas(data));
  }, []);

  const { filterState, onInputChange, onCheckboxChange, changeParameters } =
    useForm({
      tituloPrompt: "",
      descripcionPrompt: "",
      llms: [] as number[],
      tematicas: [] as number[],
      promptVarianteNombre: "1",
      promptVarianteTexto: "",
      parametros: [] as Parametro[],
    });

  const [createdParametersNames, setCreatedParametersNames] = useState<
    string[]
  >([]);

  const handleCreatedParameter = () => {
    const regex = new RegExp(`{{Parametro: [^}]*}}`, "g");
    const newParameters = Array.from(
      filterState.promptVarianteTexto.matchAll(regex),
    );
    const newParametersNames = newParameters.map((parameter) =>
      parameter[0].replace("{{Parametro: ", "").replace("}}", ""),
    );

    if (newParametersNames.length === 0) {
      notify(
        "No hay parametros escritos correctamente para ser creados",
        "error",
      );
      return;
    } else {
      setCreatedParametersNames(newParametersNames);
    }
  };

  const handleSetParameters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newParametersList: Parametro[] = [];

    const inputs = Array.from(event.currentTarget.elements);
    createdParametersNames.map((parameter) => {
      const parameterName = parameter;
      const parameterTypeInput = inputs.find(
        (input: Element) =>
          (input as HTMLInputElement).name === `tipoValor-${parameterName}`,
      ) as HTMLInputElement;
      const parameterTypeInputValue = parameterTypeInput?.value;

      const parameterDefaultValue = document.getElementById(
        `valorPredeterminado-${parameterName}`,
      ) as HTMLInputElement;
      const parameterDefaultInputValue = parameterDefaultValue?.value;

      const parameterOptionsInput = document.getElementById(
        `opciones-${parameterName}`,
      ) as HTMLInputElement;
      const parameterOptionsInputValue = parameterOptionsInput?.value;

      newParametersList.push({
        id: 0,
        nombre: parameterName,
        tipoValor: parameterTypeInputValue as TipoParametro,
        valorPredeterminado: parameterDefaultInputValue,
        opcionParametros: parameterOptionsInputValue
          ? parameterOptionsInputValue.split(",").map((opcion) => ({
              id: 0,
              valor: opcion,
            }))
          : undefined,
      });
    });

    changeParameters(newParametersList);
    setDefinedPrompt(true);
  };

  const handleCreatePrompt = () => {
    const promptConNavegacion: PromptConNavegacion = {
      titulo: filterState.tituloPrompt,
      descripcion: filterState.descripcionPrompt,
      fechaCreacion: new Date().toISOString().split("T")[0],
      usuarioCreadorId: usuarioEnBBDD?.id ?? 99,
      promptVariantes: [
        {
          nombre: filterState.promptVarianteNombre,
          textoPrompt: filterState.promptVarianteTexto,
          parametros: filterState.parametros.map((parametro: Parametro) => ({
            nombre: parametro.nombre,
            tipoValor: parametro.tipoValor,
            valorPredeterminado: parametro.valorPredeterminado ?? "",
            opcionParametros: parametro.opcionParametros?.map((opcion) => ({
              valor: opcion.valor,
            })),
          })),
        },
      ],
      llmIds: filterState.llms,
      tematicaIds: filterState.tematicas,
    };

    if (
      promptConNavegacion.titulo === "" ||
      promptConNavegacion.promptVariantes[0].nombre === "" ||
      promptConNavegacion.promptVariantes[0].textoPrompt === ""
    ) {
      notify("Faltan datos por completar", "error");
      return;
    } else {
      addPromptConNavegacion(promptConNavegacion);
      notify("Prompt creado correctamente", "success");
    }
  };

  const [definedPrompt, setDefinedPrompt] = useState<boolean>(false);

  return (
    <div className="createPromptForm animate__fadeIn animate__animated">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-8 lg:p-16">
        <div className="col-span-4 flex flex-col gap-4">
          <TextField
            id="tituloPrompt"
            label="Titulo del prompt"
            variant="outlined"
            className="w-full"
            value={filterState.tituloPrompt}
            name="tituloPrompt"
            required
            onChange={onInputChange}
          />
          <TextField
            id="Descripcion"
            label="Descripcion"
            variant="outlined"
            className="w-full"
            value={filterState.descripcionPrompt}
            name="descripcionPrompt"
            required
            onChange={onInputChange}
            multiline={true}
            rows={4}
          />
        </div>

        <div className="llmsContainer col-span-2 col-start-5 flex flex-col gap-2">
          <FormLabel component="legend" className="!text-primary">
            LLMs
          </FormLabel>
          <FormGroup className="!grid xl:grid-cols-2">
            {llms.map((llm) => (
              <FormControlLabel
                key={llm.id}
                control={
                  <Checkbox
                    name={`${llm.nombre}`}
                    value={`${llm.id}`}
                    onChange={(event) => onCheckboxChange(event, "llms")}
                  />
                }
                label={`${llm.nombre}`}
                className="col-span-1"
              />
            ))}
          </FormGroup>
        </div>

        <div className="tematicasContainer col-span-2 flex flex-col gap-2">
          <FormLabel component="legend" className="!text-primary">
            Tematicas
          </FormLabel>
          <FormGroup className="!grid lg:grid-cols-2">
            {tematicas.map((tematica) => (
              <FormControlLabel
                key={tematica.id}
                control={
                  <Checkbox
                    name={`${tematica.nombre}`}
                    value={`${tematica.id}`}
                    onChange={(event) => onCheckboxChange(event, "tematicas")}
                  />
                }
                label={`${tematica.nombre}`}
                className="col-span-1"
              />
            ))}
          </FormGroup>
        </div>
        <hr className="text-primarydark col-span-8 my-6" />
        <h3 className="col-span-8 mb-4">Variante inicial del Prompt</h3>
        <div className="col-span-2 flex items-center">
          <TextField
            id="outlined-basic"
            label="Nombre de la variante"
            variant="outlined"
            className="w-full"
            value={filterState.promptVarianteNombre}
            name="promptVarianteNombre"
            onChange={onInputChange}
            required
          />
        </div>

        <div className="col-span-8">
          <TextField
            id="textoPrompt"
            label="Texto del Prompt"
            variant="outlined"
            className="w-full"
            multiline={true}
            rows={10}
            value={filterState.promptVarianteTexto}
            name="promptVarianteTexto"
            onChange={onInputChange}
            required
          />
          <small className="text-grey">
            Si deseas agregar parametros al prompt utiliza la sintaxis "
            {`{{Parametro: NombreParametro}}`}" en el cual se inserta el nombre
            del parametro en "NombreParametro" respetando el espacio y el resto
            de caracteres (por ejemplo:{" "}
            {`{{Parametro: lenguaje de programacion}}`}), luego pulsa el boton
            de crear parametros y configuralos a tu interes.
          </small>
        </div>
        <div className="col-span-4 flex flex-col gap-8 text-center lg:col-span-4 lg:flex-row">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatedParameter}
          >
            Crear Parametros
          </Button>
          <>
            <span> o </span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePrompt}
            >
              Crear Prompt sin parametros
            </Button>
          </>
        </div>
        {createdParametersNames.length > 0 && (
          <form action="" className="col-span-8" onSubmit={handleSetParameters}>
            <hr className="text-primarydark my-6" />
            <h3 className="mb-8">Editar parametros</h3>
            <div className="flex grid-cols-7 flex-col lg:grid">
              <h5 className="col-span-1 hidden text-center lg:block">Nombre</h5>
              <h5 className="col-span-2 hidden text-center lg:block">
                Tipo de valor
              </h5>
              <h5 className="col-span-2 hidden text-center lg:block">
                Valor por defecto
              </h5>
              {createdParametersNames.map((parameterName) => (
                <div key={parameterName} className="col-span-8">
                  <CreateParameterPrompt parameterName={parameterName} />
                </div>
              ))}
            </div>
            <Button
              className="w-full lg:col-span-4 lg:col-start-3"
              variant="contained"
              type="submit"
            >
              Definir plantilla de Prompt
            </Button>
          </form>
        )}
        {definedPrompt && (
          <>
            <hr className="text-primarydark col-span-8 my-6" />
            <Button
              className="col-span-6 col-start-2 h-12"
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleCreatePrompt}
            >
              CREAR PROMPT
            </Button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
