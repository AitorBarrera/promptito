import React from "react";
import type { PaginationPromptsProps } from "~/interfaces";

export const PaginationPrompts = ({
  cantidadDePaginas,
  actualPage,
  setActualPage,
}: PaginationPromptsProps) => {
  const offset = Math.max(actualPage - 4, 0);
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {Array.from({ length: 7 }, (a, i) =>
        i + 1 + offset <= cantidadDePaginas ? (
          <button
            key={i}
            className={`${
              actualPage === i + 1 + offset
                ? "bg-primary text-primaryblack"
                : "bg-primaryblack text-primarywhite"
            } h-10 w-10 cursor-pointer rounded-md`}
            onClick={() => {
              window.scrollTo(0, 0);
              setActualPage(i + 1 + offset);
            }}
          >
            {i + 1 + offset}
          </button>
        ) : null,
      )}
    </div>
  );
};
