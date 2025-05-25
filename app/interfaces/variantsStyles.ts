export type buttonVariants = 1 | 2 | 3;

export const buttonVariantsRecord: Record<buttonVariants, string> = {
  1: " text-primary hover:text-primaryblack hover:bg-primary hover:border-primaryblack",
  2: " text-primary",
  3: " text-primary",
};

export type iconVariants =
  | "star"
  | "half_star"
  | "copy"
  | "user"
  | "eye"
  | "house"
  | "search"
  | "pencil"
  | "info";

export const iconVariantsRecord: Record<iconVariants, string> = {
  star: " fa-regular fa-star",
  half_star: " fa-regular fa-star-half-stroke",
  copy: " fa-regular fa-copy",
  user: " fa-solid fa-user",
  eye: " fa-regular fa-eye",
  house: "fa-solid fa-house",
  search: "fa-solid fa-magnifying-glass",
  pencil: "fa-solid fa-pen-to-square",
  info: "fa-solid fa-circle-info",
};
