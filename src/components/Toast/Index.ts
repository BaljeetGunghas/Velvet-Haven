import { ToastOptions, Bounce } from 'react-toastify';


export const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Bounce,
  style: {
    fontSize: "16px", // Reduce font size
    padding: "10px", // Reduce padding for smaller size
  },
};