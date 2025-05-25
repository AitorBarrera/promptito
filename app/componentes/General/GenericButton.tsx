import type { GenericButtonProps } from "~/interfaces/props";
import { buttonVariantsRecord } from "~/interfaces/variantsStyles";
import { Icon } from "./Icon";

export const GenericButton = ({
  text,
  buttonVariant,
  iconName,
  onClickHandler,
}: GenericButtonProps) => {
  return (
    <button
      className={`cursor-pointer rounded-[20px] border-2 px-6 py-2 transition ${buttonVariantsRecord[buttonVariant]}`}
      onClick={onClickHandler}
    >
      {iconName && <Icon iconName={iconName} margin_right={10} />}
      <span className="">{text}</span>
    </button>
  );
};
