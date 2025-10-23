/**
 * API Configuration
 * Update API_BASE_URL to match your backend server
 */
const API_CONFIG = {
  // Backend API base URL - update this based on your environment
  BASE_URL: "https://skyline-backend-bqzy.onrender.com/api",
//  BASE_URL: "http://localhost:3000/api",
  // API endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",

    // User endpoints
    GET_ME: "/users/me",
    LIST_USERS: "/users",
    CREATE_USER: "/users",
  },

  // Request timeout in milliseconds
  TIMEOUT: 30000,
};

// Make it available globally
window.API_CONFIG = API_CONFIG;
