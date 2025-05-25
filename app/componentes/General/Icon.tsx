import type { IconProps } from "~/interfaces/props";
import { iconVariantsRecord } from "~/interfaces/variantsStyles";

export const Icon = ({ iconName, margin_right = 0 }: IconProps) => {
  return (
    <i
      className={`${iconVariantsRecord[iconName]} flex align-center`}
      style={{ marginRight: `${margin_right}px` }}
    />
  );
};
