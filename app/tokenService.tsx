// src/utils/tokenService.js

const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";
const USERNAME_KEY = "username";

const tokenService = {
  // Save token and role to localStorage
  setToken: (token: string, role: string, username: any) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USERNAME_KEY, username);
  },

  // Retrieve the token from localStorage
  getToken: () => localStorage.getItem(TOKEN_KEY),

  // Retrieve the user role from localStorage
  getRole: () => localStorage.getItem(ROLE_KEY),

  getUsername: () => localStorage.getItem(USERNAME_KEY),

  // Remove token and role from localStorage
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERNAME_KEY);
  }
};

export default tokenService;
