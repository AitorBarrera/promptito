import { Slide, ToastContainer, toast } from "react-toastify";
import React from "react";

export const useToast = () => {
  const toastContainer = () => {
    return React.createElement(ToastContainer);
  };

  const notify = (
    text: string,
    type: "success" | "error" | "warning" | "info",
  ) =>
    toast[type](text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  return {
    notify,
    ToastContainer: toastContainer,
  };
};
