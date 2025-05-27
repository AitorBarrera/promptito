import { OrbitProgress } from "react-loading-indicators";

type LoadingIndicatorProps = {
  colorHEX?: string;
};

export const LoadingIndicator = ({ colorHEX }: LoadingIndicatorProps) => {
  return (
    <div className="flex h-full flex-grow items-center justify-center">
      <OrbitProgress
        variant="split-disc"
        color={`#${colorHEX || "022422"}`}
        size="medium"
        text="CARGANDO"
        textColor=""
      />
    </div>
  );
};
