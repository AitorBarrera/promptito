import { createContext } from "react";
import type { Usuario } from "~/interfaces";

export const UserContext = createContext<Usuario | null>(null);
