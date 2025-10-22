/**
 * Tracking API Service
 * Handles all tracking-related API calls
 */

class TrackingAPI {
  /**
   * Track shipment/container by number
   * GET /api/tracking/:number
   */
  async track(number) {
    return await authService.apiRequest(
      `/tracking/${encodeURIComponent(number)}`,
      {
        method: "GET",
      }
    );
  }

  /**
   * Get active containers
   * GET /api/tracking/containers/active
   */
  async getActiveContainers() {
    return await authService.apiRequest("/tracking/containers/active", {
      method: "GET",
    });
  }

  /**
   * Webhook endpoint (for internal use)
   * POST /api/tracking/webhook
   */
  async webhook(data) {
    return await authService.apiRequest("/tracking/webhook", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Create global instance
window.trackingAPI = new TrackingAPI();

