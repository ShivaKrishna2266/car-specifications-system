// src/utils/tokenService.js

const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";
const USERNAME_KEY = "username";
const USER_ID_KEY = "userId";


// Decode JWT
const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse token:", e);
    return null;
  }
};

const tokenService = {
  // Save token and role to localStorage
  setToken: (token: string, role: string, username: string, userId: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(USER_ID_KEY, userId)
  },

  // Retrieve the token from localStorage
  getToken: () => localStorage.getItem(TOKEN_KEY),

  // Retrieve the user role from localStorage
  getRole: () => localStorage.getItem(ROLE_KEY),

  // Retrieve the username from localStorage
  getUsername: () => localStorage.getItem(USERNAME_KEY),

  getUserId: (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      console.warn("No token found");
      return null;
    }
    const decoded = parseJwt(token);
    console.log("Decoded token:", decoded);
    return decoded?.userId?.toString() ?? decoded?.id?.toString() ?? decoded?.sub?.toString() ?? null;
  },
  

  // Remove token and role from localStorage
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USER_ID_KEY); // Remove userId from localStorage
  }
};

export default tokenService;
