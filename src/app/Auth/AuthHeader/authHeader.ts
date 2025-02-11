import { parseCookies } from "nookies";

/**
 * Returns authentication headers with the token from cookies.
 */
export const authHeader = () => {
    const cookies = parseCookies();
    const token = cookies.authToken; // Get token from cookies

    return token
        ? { Authorization: `Bearer ${token}` }
        : {}; // Return empty if no token
};
