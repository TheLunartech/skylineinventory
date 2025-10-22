/**
 * Containers API Service
 * Handles all container-related API calls
 */

class ContainersAPI {
  /**
   * Get all containers
   * GET /api/containers
   */
  async getAll() {
    return await authService.apiRequest("/containers", {
      method: "GET",
    });
  }

  /**
   * Get container by ID
   * GET /api/containers/:id
   */
  async getById(id) {
    return await authService.apiRequest(`/containers/${id}`, {
      method: "GET",
    });
  }

  /**
   * Create new container
   * POST /api/containers
   * Requires: ADMIN or CHINA_STAFF role
   */
  async create(data) {
    return await authService.apiRequest("/containers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Update container
   * PUT /api/containers/:id
   * Requires: ADMIN or CHINA_STAFF role
   */
  async update(id, data) {
    return await authService.apiRequest(`/containers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * Load shipments into container
   * POST /api/containers/:id/load
   * Requires: ADMIN or CHINA_STAFF role
   */
  async loadShipments(id, shipmentIds) {
    return await authService.apiRequest(`/containers/${id}/load`, {
      method: "POST",
      body: JSON.stringify({ shipmentIds }),
    });
  }

  /**
   * Get shipments in container
   * GET /api/containers/:id/shipments
   */
  async getShipments(id) {
    return await authService.apiRequest(`/containers/${id}/shipments`, {
      method: "GET",
    });
  }
}

// Create global instance
window.containersAPI = new ContainersAPI();

