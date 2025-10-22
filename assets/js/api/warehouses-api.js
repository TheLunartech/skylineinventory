/**
 * Warehouses API Service
 * Handles all warehouse-related API calls
 */

class WarehousesAPI {
  /**
   * Get all warehouses
   * GET /api/warehouses
   */
  async getAll() {
    return await authService.apiRequest("/warehouses", {
      method: "GET",
    });
  }

  /**
   * Get warehouse by ID
   * GET /api/warehouses/:id
   */
  async getById(id) {
    return await authService.apiRequest(`/warehouses/${id}`, {
      method: "GET",
    });
  }

  /**
   * Create new warehouse
   * POST /api/warehouses
   * Requires: ADMIN role
   */
  async create(data) {
    return await authService.apiRequest("/warehouses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Get warehouse inventory
   * GET /api/warehouses/:id/inventory
   */
  async getInventory(id) {
    return await authService.apiRequest(`/warehouses/${id}/inventory`, {
      method: "GET",
    });
  }
}

// Create global instance
window.warehousesAPI = new WarehousesAPI();

