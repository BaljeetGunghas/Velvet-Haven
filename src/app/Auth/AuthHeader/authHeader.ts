import { parseCookies } from "nookies";

/**
 * Returns authentication headers with the token from cookies or localStorage.
 * Checks multiple possible token storage locations
 */
export const authHeader = () => {
    let token: string | null = null;

    // 1. Try to get token from cookies (most reliable)
    try {
        const cookies = parseCookies();
        token = cookies.authToken ||
                cookies.token ||
                cookies.Authorization ||
                cookies.access_token;
    } catch (e) {
        console.error("Error reading cookies:", e);
    }

    // 2. If not in cookies, try localStorage
    if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("authToken") ||
                localStorage.getItem("token") ||
                localStorage.getItem("access_token") ||
                localStorage.getItem("Authorization");
    }

    // 3. Try to extract from Redux persist
    if (!token && typeof window !== "undefined") {
        try {
            const reduxPersist = localStorage.getItem("persist:root");
            if (reduxPersist) {
                const parsed = JSON.parse(reduxPersist);
                const authState = JSON.parse(parsed.auth || "{}");

                // Check different possible auth structures
                token = authState?.user?.token ||
                       authState?.token ||
                       authState?.accessToken ||
                       authState?.access_token;
            }
        } catch (e) {
            console.error("Error parsing Redux persist:", e);
        }
    }

    // 4. Try to get from sessionStorage
    if (!token && typeof window !== "undefined") {
        token = sessionStorage.getItem("authToken") ||
                sessionStorage.getItem("token") ||
                sessionStorage.getItem("access_token");
    }

    // Log for debugging
    if (!token) {
        console.warn("⚠️ No authentication token found in any storage location");
        console.warn("Checked: cookies.authToken, cookies.token, localStorage, sessionStorage, Redux");
    } else {
        // Log token (masked for security)
        const maskedToken = token.substring(0, 20) + "..." + token.substring(token.length - 10);
        console.log(`✓ Token found and will be sent: ${maskedToken}`);
    }

    // Build headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        // Remove "Bearer " prefix if already present to avoid duplication
        const cleanToken = token.replace(/^Bearer\s+/i, "").trim();
        headers.Authorization = `Bearer ${cleanToken}`;
    }

    return headers;
};

/**
 * Check where the token is stored and log it
 */
export const debugAuthToken = () => {
    console.group("🔐 Token Debug Info");

    // Check cookies
    console.log("1️⃣ Checking Cookies...");
    try {
        const cookies = parseCookies();
        const tokenCookie = cookies.authToken || cookies.token || cookies.access_token;
        console.log(tokenCookie ? "✓ Found in cookies" : "✗ Not found in cookies");
        if (tokenCookie) console.log("Value:", tokenCookie.substring(0, 50) + "...");
    } catch (e) {
        console.error("Error reading cookies:", e);
    }

    // Check localStorage
    console.log("\n2️⃣ Checking LocalStorage...");
    const authTokenLS = localStorage.getItem("authToken");
    const tokenLS = localStorage.getItem("token");
    const accessTokenLS = localStorage.getItem("access_token");
    console.log("authToken:", authTokenLS ? "✓ Found" : "✗ Not found");
    console.log("token:", tokenLS ? "✓ Found" : "✗ Not found");
    console.log("access_token:", accessTokenLS ? "✓ Found" : "✗ Not found");

    // Check Redux persist
    console.log("\n3️⃣ Checking Redux Persist...");
    try {
        const reduxPersist = localStorage.getItem("persist:root");
        if (reduxPersist) {
            const parsed = JSON.parse(reduxPersist);
            const authState = JSON.parse(parsed.auth || "{}");
            console.log("Redux auth state:", authState);
        } else {
            console.log("✗ Redux persist not found");
        }
    } catch (e) {
        console.error("Error checking Redux:", e);
    }

    // Check sessionStorage
    console.log("\n4️⃣ Checking SessionStorage...");
    const tokenSession = sessionStorage.getItem("token");
    console.log("token:", tokenSession ? "✓ Found" : "✗ Not found");

    // Show what headers will be sent
    console.log("\n5️⃣ Headers that will be sent:");
    console.log(authHeader());

    console.groupEnd();
};

// Auto-debug on first import in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    // Uncomment to auto-debug:
    // debugAuthToken();
}
