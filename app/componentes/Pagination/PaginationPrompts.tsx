import React from "react";
import type { PaginationPromptsProps } from "~/interfaces";

export const PaginationPrompts = ({
  cantidadDePaginas,
  actualPage,
  setActualPage,
}: PaginationPromptsProps) => {
  return (
    <div className="flex items-center justify-end gap-4 p-4">
      {Array.from({ length: cantidadDePaginas }, (a, i) => (
        <button
          key={i}
          className={`${
            actualPage === i + 1
              ? "bg-primary text-primaryblack"
              : "bg-primaryblack text-primarywhite"
          } h-10 w-10 cursor-pointer rounded-md`}
          onClick={() => {
            window.scrollTo(0, 0);
            setActualPage(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
