import { OrbitProgress } from "react-loading-indicators";

export const LoadingIndicator = () => {
  return (
    <div className="flex h-full flex-grow items-center justify-center">
      <OrbitProgress
        variant="split-disc"
        color="#022422"
        size="medium"
        text="CARGANDO"
        textColor=""
      />
    </div>
  );
};
