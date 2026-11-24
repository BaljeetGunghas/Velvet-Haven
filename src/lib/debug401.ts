/**
 * Debug utility to check authentication token and 401 issues
 */

export const debug401Issue = () => {
    console.group("🔍 Debug 401 Authentication Issue");

    // Check cookies
    console.log("📦 Cookies:");
    const cookies = document.cookie.split("; ").reduce(
        (acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        },
        {} as Record<string, string>
    );
    console.table(cookies);

    // Check localStorage
    console.log("\n💾 LocalStorage:");
    const storage = {} as Record<string, string>;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const value = localStorage.getItem(key);
            if (value && value.length < 200) {
                storage[key] = value;
            } else {
                storage[key] = `[Long value - ${value?.length} chars]`;
            }
        }
    }
    console.table(storage);

    // Check sessionStorage
    console.log("\n⏱️ SessionStorage:");
    const sessionStorage_ = {} as Record<string, string>;
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
            const value = sessionStorage.getItem(key);
            if (value && value.length < 200) {
                sessionStorage_[key] = value;
            } else {
                sessionStorage_[key] = `[Long value - ${value?.length} chars]`;
            }
        }
    }
    console.table(sessionStorage_);

    // Check for auth token
    console.log("\n🔑 Token Status:");
    const tokenLocations = {
        "cookies.authToken": cookies.authToken ? "✓ Found" : "✗ Missing",
        "cookies.token": cookies.token ? "✓ Found" : "✗ Missing",
        "localStorage.authToken": localStorage.getItem("authToken")
            ? "✓ Found"
            : "✗ Missing",
        "localStorage.token": localStorage.getItem("token")
            ? "✓ Found"
            : "✗ Missing",
        "localStorage.auth": localStorage.getItem("auth")
            ? "✓ Found (JSON)"
            : "✗ Missing",
    };
    console.table(tokenLocations);

    // Check Redux state
    console.log("\n🏪 Redux State (Auth):");
    const reduxAuth = localStorage.getItem("persist:root");
    if (reduxAuth) {
        try {
            const parsed = JSON.parse(reduxAuth);
            const auth = JSON.parse(parsed.auth || "{}");
            console.log("Auth State:", auth);
        } catch (e) {
            console.error("Error parsing Redux auth state:", e);
        }
    }

    console.groupEnd();
};

/**
 * Check if token is present and valid
 */
export const checkTokenValidity = (): {
    hasToken: boolean;
    tokenLocation: string;
    token: string;
} => {
    const cookies = parseCookies();

    let token = cookies.authToken ||
               cookies.token ||
               localStorage.getItem("authToken") ||
               localStorage.getItem("token");

    return {
        hasToken: !!token,
        tokenLocation: cookies.authToken
            ? "cookies.authToken"
            : cookies.token
              ? "cookies.token"
              : localStorage.getItem("authToken")
                ? "localStorage.authToken"
                : localStorage.getItem("token")
                  ? "localStorage.token"
                  : "Not found",
        token: token || "",
    };
};

/**
 * Helper function to parse cookies
 */
function parseCookies(): Record<string, string> {
    return document.cookie.split("; ").reduce(
        (acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        },
        {} as Record<string, string>
    );
}

/**
 * Force logout and clear session
 */
export const forceLogout = () => {
    console.warn("🚨 Force logging out user");

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect
    window.location.href = "/";
};
