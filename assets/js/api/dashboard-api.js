/**
 * Dashboard API Service
 * Handles all dashboard-related API calls
 */

class DashboardAPI {
  /**
   * Get dashboard statistics
   * GET /api/dashboard/stats
   */
  async getStats() {
    return await authService.apiRequest("/dashboard/stats", {
      method: "GET",
    });
  }

  /**
   * Get recent activity
   * GET /api/dashboard/activity
   */
  async getActivity() {
    return await authService.apiRequest("/dashboard/activity", {
      method: "GET",
    });
  }

  /**
   * Get insights
   * GET /api/dashboard/insights
   */
  async getInsights() {
    return await authService.apiRequest("/dashboard/insights", {
      method: "GET",
    });
  }
}

// Create global instance
window.dashboardAPI = new DashboardAPI();

