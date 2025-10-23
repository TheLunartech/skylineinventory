/**
 * Documents API Service
 * Handles all document-related API calls
 */

class DocumentsAPI {
  /**
   * Get all documents
   * GET /api/documents
   */
  async getAll() {
    return await authService.apiRequest("/documents", {
      method: "GET",
    });
  }

  /**
   * Get document by ID
   * GET /api/documents/:id
   */
  async getById(id) {
    return await authService.apiRequest(`/documents/${id}`, {
      method: "GET",
    });
  }

  /**
   * Create new document
   * POST /api/documents
   */
  async create(data) {
    return await authService.apiRequest("/documents", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Delete document
   * DELETE /api/documents/:id
   * Requires: ADMIN role
   */
  async delete(id) {
    return await authService.apiRequest(`/documents/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Get documents for a shipment
   * GET /api/documents/shipment/:id
   */
  async getForShipment(shipmentId) {
    return await authService.apiRequest(`/documents/shipment/${shipmentId}`, {
      method: "GET",
    });
  }
}

// Create global instance
window.documentsAPI = new DocumentsAPI();


