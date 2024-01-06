import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationMessagesProps {
  // Add any additional props if needed
}

const NotificationMessages: React.FC<NotificationMessagesProps> = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const notifySuccess = (message: string) => toast.success(message);
export const notifyError = (message: string) => toast.error(message);

export default NotificationMessages;
