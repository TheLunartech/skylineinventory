/**
 * Shipments API Service
 * Handles all shipment-related API calls
 */

class ShipmentsAPI {
  /**
   * Get all shipments (filtered by user's warehouse access)
   * GET /api/shipments
   */
  async getAll() {
    return await authService.apiRequest("/shipments", {
      method: "GET",
    });
  }

  /**
   * Search shipments
   * GET /api/shipments/search?q=query
   */
  async search(query) {
    return await authService.apiRequest(
      `/shipments/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
      }
    );
  }

  /**
   * Get shipment by ID
   * GET /api/shipments/:id
   */
  async getById(id) {
    return await authService.apiRequest(`/shipments/${id}`, {
      method: "GET",
    });
  }

  /**
   * Create new shipment
   * POST /api/shipments
   */
  async create(data) {
    return await authService.apiRequest("/shipments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Update shipment
   * PUT /api/shipments/:id
   */
  async update(id, data) {
    return await authService.apiRequest(`/shipments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}

// Create global instance
window.shipmentsAPI = new ShipmentsAPI();

