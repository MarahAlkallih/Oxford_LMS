import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppToastContainer = () => {
  return <ToastContainer position="top-center" autoClose={3000}  />;
};
