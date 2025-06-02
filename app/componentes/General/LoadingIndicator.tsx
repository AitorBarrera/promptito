import { OrbitProgress } from "react-loading-indicators";

type LoadingIndicatorProps = {
  colorHEX?: string;
  text?: string;
};

export const LoadingIndicator = ({ colorHEX, text }: LoadingIndicatorProps) => {
  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center">
      <OrbitProgress
        variant="split-disc"
        color={`#${colorHEX || "ffffff"}`}
        size="medium"
        text="CARGANDO"
        textColor=""
      />
      <h4 className="!text-3xl !text-white !uppercase">{text}</h4>
    </div>
  );
};
