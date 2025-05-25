import { useEffect, useState } from "react";

type ErrorType = {
  code: number;
  message: string;
} | null;

export const useFetch = (url: string) => {
  const [state, setState] = useState({
    data: null as any,
    isLoading: true as boolean,
    hasError: false as boolean,
    error: null as ErrorType,
  });

  const setLoadingState = () => {
    setState({ data: null, isLoading: true, hasError: false, error: null });
  };

  const getFetch = async () => {
    // setLoadingState();

    console.log("url", url);
    const resp = await fetch(url);

    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
