export type TipoParametro = "string" | "listaOpciones" | "number";

export interface Filters {
  tituloPrompt: string | null;
  nombreAutor: string | null;
  contenidoPrompt: string | null;
  orderBy: string | null;
  idLlm: number | null;
  idPromptTematica: number | null;
  idUsuarioFavorito: number | null;
  esFavorito: boolean;
}

export interface Prompt {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  promptVariantes: PromptVariante[];
  usuarioCreador: Usuario;
  llms: LLM[];
  tematicas: Tematica[];
  enFavoritosDe: Usuario[];
}

export interface PromptVariante {
  id?: number;
  nombre: string;
  textoPrompt: string;
  promptId: number | null;
  parametros?: Parametro[] | null | undefined;
}

export interface Parametro {
  id?: number;
  nombre: string;
  tipoValor: TipoParametro;
  valorPredeterminado: string | null | undefined;
  opcionParametros?: OpcionParametro[] | null | undefined;
}

export interface OpcionParametro {
  id?: number;
  valor: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  avatarUrl: string | null;
  idClerk: string | null;
  estaActivo: boolean;
}

export interface UsuarioPost {
  nombre: string | null;
  email: string | null;
  passwordHash: string | null;
  avatarUrl: string | null;
  idClerk: string | null;
  estaActivo: boolean | null;
}

export interface LLM {
  id: number;
  nombre: string;
}

export interface Tematica {
  id: number;
  nombre: string;
}

export interface CreatePrompt {
  tituloPrompt?: string;
  descripcionPrompt?: string;
  llms?: number[];
  tematicas?: number[];
  promptVarianteNombre?: string;
  promptVarianteTexto?: string;
  parametros?: Parametro[];
}

export interface PromptConNavegacion {
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  usuarioCreadorId: number;
  promptVariantes: [
    {
      nombre: string;
      textoPrompt: string;
      parametros?: {
        nombre: string;
        tipoValor: TipoParametro;
        valorPredeterminado: string;
        opcionParametros?: {
          valor: string;
        }[];
      }[];
    },
  ];
  llmIds?: number[];
  tematicaIds?: number[];
}
