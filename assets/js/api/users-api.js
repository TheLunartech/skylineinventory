/**
 * Users API Service
 * Handles all user management API calls
 */

class UsersAPI {
  /**
   * Get current user profile
   * GET /api/users/me
   */
  async getMe() {
    return await authService.getProfile();
  }

  /**
   * Get all users
   * GET /api/users
   * Requires: ADMIN role
   */
  async getAll() {
    return await authService.apiRequest("/users", {
      method: "GET",
    });
  }

  /**
   * Create new user
   * POST /api/users
   * Requires: ADMIN role
   */
  async create(data) {
    return await authService.apiRequest("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Create global instance
window.usersAPI = new UsersAPI();
