/**
 * Reports API Service
 * Handles all reports-related API calls
 */

class ReportsAPI {
  /**
   * Get shipments analytics
   * GET /api/reports/shipments
   */
  async getShipmentsReport() {
    return await authService.apiRequest("/reports/shipments", {
      method: "GET",
    });
  }

  /**
   * Get containers performance
   * GET /api/reports/containers
   */
  async getContainersReport() {
    return await authService.apiRequest("/reports/containers", {
      method: "GET",
    });
  }

  /**
   * Get financial reports
   * GET /api/reports/financial
   * Requires: ADMIN role
   */
  async getFinancialReport() {
    return await authService.apiRequest("/reports/financial", {
      method: "GET",
    });
  }

  /**
   * Get warehouse operations report
   * GET /api/reports/warehouse
   */
  async getWarehouseReport() {
    return await authService.apiRequest("/reports/warehouse", {
      method: "GET",
    });
  }

  /**
   * Export report
   * POST /api/reports/export
   */
  async exportReport(data) {
    return await authService.apiRequest("/reports/export", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Create global instance
window.reportsAPI = new ReportsAPI();


