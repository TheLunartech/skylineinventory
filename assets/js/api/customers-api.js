/**
 * Customers API Service
 * Handles all customer-related API calls
 */

class CustomersAPI {
  /**
   * Get all customers
   * GET /api/customers
   */
  async getAll() {
    return await authService.apiRequest("/customers", {
      method: "GET",
    });
  }

  /**
   * Get customer by ID
   * GET /api/customers/:id
   */
  async getById(id) {
    return await authService.apiRequest(`/customers/${id}`, {
      method: "GET",
    });
  }

  /**
   * Create new customer
   * POST /api/customers
   */
  async create(data) {
    return await authService.apiRequest("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Update customer
   * PUT /api/customers/:id
   */
  async update(id, data) {
    return await authService.apiRequest(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * Get customer's shipments
   * GET /api/customers/:id/shipments
   */
  async getShipments(id) {
    return await authService.apiRequest(`/customers/${id}/shipments`, {
      method: "GET",
    });
  }
}

// Create global instance
window.customersAPI = new CustomersAPI();

