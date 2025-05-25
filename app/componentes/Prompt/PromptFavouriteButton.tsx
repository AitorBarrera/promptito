import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";
import type { PromptFavouriteButtonProps } from "~/interfaces";
import { addFavourite, removeFavourite } from "~/services/Promptito_API";

export const PromptFavouriteButton = ({
  idCurrentUser,
  idPrompt,
  initialNumberFavourites,
  inFavourites,
  setFavourites,
}: PromptFavouriteButtonProps) => {
  const [currentNumberFavourites, setCurrentNumberFavourites] = useState(
    initialNumberFavourites,
  );

  const handleClickButton = () => {
    if (idCurrentUser !== undefined) {
      if (inFavourites) {
        removeFavourite(idCurrentUser ?? 0, idPrompt);
        setCurrentNumberFavourites(currentNumberFavourites - 1);
      } else {
        addFavourite(idCurrentUser ?? 0, idPrompt);
        setCurrentNumberFavourites(currentNumberFavourites + 1);
      }

      setFavourites((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center text-end">
      <IconButton aria-label="star" color="primary" onClick={handleClickButton}>
        {inFavourites ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
      <span>{currentNumberFavourites}</span>
    </div>
  );
};
