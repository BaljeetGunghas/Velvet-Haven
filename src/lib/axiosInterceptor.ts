import axios, { AxiosError, AxiosResponse } from "axios";
import { clear401Session } from "@/Hooks/handle401Response";
import { toast } from "react-toastify";

/**
 * Setup Axios interceptors for handling 401 responses globally
 */
export const setupAxiosInterceptors = () => {
    // Response interceptor
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            // Check for 401 in custom response format
            if (response.data?.output === -401 || response.status === 401) {
                console.warn("401 Unauthorized - Clearing session");
                toast.error("Session expired. Please login again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                clear401Session();
                return Promise.reject(new Error("Unauthorized"));
            }
            return response;
        },
        (error: AxiosError) => {
            // Check for 401 status code
            if (error.response?.status === 401) {
                console.warn("401 Unauthorized - Clearing session");
                toast.error("Session expired. Please login again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                clear401Session();
                return Promise.reject(error);
            }

            // Handle other errors
            if (error.response?.status === 403) {
                toast.error("Access forbidden", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

            return Promise.reject(error);
        }
    );
};
