import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import type {
  buttonVariants,
  Filters,
  iconVariants,
  Prompt,
  PromptVariante,
} from "./";

export interface GenericButtonProps {
  text: string;
  buttonVariant: buttonVariants;
  iconName?: iconVariants;
  onClickHandler?: () => void;
}

export interface IconProps {
  iconName: iconVariants;
  margin_right?: number;
}

export interface PromptComponenteProps {
  prompt: Prompt;
  idClerkUsuarioActual?: string | null;
}

export interface PromptUseMenuProps {
  promptVariant: PromptVariante;
}

export interface PromptFavouriteButtonProps {
  handleClick?: () => void;
  idCurrentUser: number | null | undefined;
  idPrompt: number;
  initialNumberFavourites: number;
  inFavourites: boolean;
  setFavourites: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PromptSelectVariantProps {
  currentVariant: PromptVariante;
  promptVariantes: PromptVariante[];
  handleChangeVariant: Dispatch<SetStateAction<PromptVariante>>;
}

export interface FilterFormProps {
  filterState: Filters;
  handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  handleSelectChange: ChangeEventHandler<HTMLSelectElement>;
}

export interface FilterFormLlmsProps {
  handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

export interface FilterFormTematicasProps {
  handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

export interface CreateParameterPromptProps {
  parameterName: string;
}

export interface PromptParametersMenuProps {
  promptVariantWithParameters: PromptVariante | null;
}

export interface PaginationPromptsProps {
  cantidadDePaginas: number;
  actualPage: number;
  setActualPage: Dispatch<SetStateAction<number>>;
}
