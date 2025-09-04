import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to show a toast
export const showToast = (message, type = "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Optional: a component to include ToastContainer in your app
export default function ToastContainerWrapper() {
  return <>{/* ToastContainer will render to portal */}</>;
}
