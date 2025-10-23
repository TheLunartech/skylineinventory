/**
 * Authentication Service
 * Handles all authentication-related API calls and token management
 * @version 1.0.1
 */

console.log(
  "🔐 AuthService v1.0.1 loaded - with auto-redirect on auth failure"
);

class AuthService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.endpoints = API_CONFIG.ENDPOINTS;
  }

  /**
   * Get access token from localStorage
   */
  getAccessToken() {
    const token = localStorage.getItem("accessToken");
    // Return null if token is empty or just whitespace
    return token && token.trim() !== "" ? token : null;
  }

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken() {
    const token = localStorage.getItem("refreshToken");
    // Return null if token is empty or just whitespace
    return token && token.trim() !== "" ? token : null;
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Save authentication data to localStorage
   */
  saveAuthData(data) {
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem("currentUser", JSON.stringify(data.user));
    }
  }

  /**
   * Clear authentication data from localStorage
   */
  clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  /**
   * Make authenticated API request
   */
  async apiRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getAccessToken();

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle 401 - try to refresh token
        if (response.status === 401) {
          console.warn("🔐 Authentication failed (401) at:", url);

          if (this.getRefreshToken()) {
            console.log("🔄 Attempting token refresh...");
            const refreshed = await this.refreshToken();

            if (refreshed) {
              // Retry original request with new token
              console.log("✅ Token refreshed, retrying request...");
              config.headers.Authorization = `Bearer ${this.getAccessToken()}`;
              const retryResponse = await fetch(url, config);
              const retryData = await retryResponse.json();

              if (!retryResponse.ok) {
                console.error(
                  "❌ Retry failed after token refresh, redirecting..."
                );
                this.handleAuthFailure();
                return; // Don't throw, just return after redirect
              }
              return retryData;
            } else {
              // Refresh failed - redirect
              console.error("❌ Token refresh failed, redirecting...");
              this.handleAuthFailure();
              return; // Don't throw, just return after redirect
            }
          } else {
            // No refresh token - redirect immediately
            console.error("❌ No refresh token available, redirecting...");
            this.handleAuthFailure();
            return; // Don't throw, just return after redirect
          }
        }

        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  /**
   * Login with email, password, and organization
   */
  async login(email, password, organization) {
    try {
      const response = await fetch(`${this.baseUrl}${this.endpoints.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, organization }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save tokens and user data
      this.saveAuthData(data);

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${this.baseUrl}${this.endpoints.REFRESH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Refresh failed, clear auth data and redirect to login
        console.error("❌ Token refresh failed");
        this.handleAuthFailure();
        throw new Error(data.message || "Token refresh failed");
      }

      // Save new tokens
      this.saveAuthData(data);

      return data;
    } catch (error) {
      console.error("Token Refresh Error:", error);
      this.handleAuthFailure();
      return null;
    }
  }

  /**
   * Handle authentication failure
   */
  handleAuthFailure() {
    console.warn("🚪 handleAuthFailure() called - Redirecting to login...");

    // Prevent multiple redirects
    if (window._isRedirecting) {
      console.log("⏸️ Already redirecting, skipping...");
      return;
    }
    window._isRedirecting = true;

    this.clearAuthData();

    // Store redirect reason
    sessionStorage.setItem("authFailureReason", "session_expired");

    console.log("🔄 Redirect scheduled to signin.html");

    // Immediate redirect without delay
    window.location.href = "signin.html";
  }

  /**
   * Logout user
   */
  logout() {
    console.log("👋 User logging out...");
    this.clearAuthData();
    window.location.href = "signin.html";
  }

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(
        `${this.baseUrl}${this.endpoints.FORGOT_PASSWORD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      return data;
    } catch (error) {
      console.error("Forgot Password Error:", error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, password) {
    try {
      const response = await fetch(
        `${this.baseUrl}${this.endpoints.RESET_PASSWORD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      return data;
    } catch (error) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token) {
    try {
      const response = await fetch(
        `${this.baseUrl}${
          this.endpoints.VERIFY_EMAIL
        }?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email verification failed");
      }

      return data;
    } catch (error) {
      console.error("Email Verification Error:", error);
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getProfile() {
    return await this.apiRequest(this.endpoints.GET_ME, {
      method: "GET",
    });
  }

  /**
   * Check if user has specific role (case-insensitive)
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role && user.role.toLowerCase() === role.toLowerCase();
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.hasRole("admin");
  }
}

// Create global instance
window.authService = new AuthService();
