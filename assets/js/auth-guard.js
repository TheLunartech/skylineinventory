/**
 * Authentication Guard
 * Protects pages that require authentication
 */

class AuthGuard {
  /**
   * Check if user is authenticated and redirect if not
   */
  static requireAuth() {
    if (!window.authService) {
      console.warn("⚠️ AuthService not loaded");
      return false;
    }
    if (!authService.isAuthenticated()) {
      // Save current page to redirect back after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      window.location.href = "signin.html";
      return false;
    }
    return true;
  }

  /**
   * Redirect to home if already authenticated (for login/signup pages)
   */
  static redirectIfAuthenticated() {
    if (!window.authService) {
      console.warn("⚠️ AuthService not loaded");
      return false;
    }
    if (authService.isAuthenticated()) {
      window.location.href = "index.html";
      return true;
    }
    return false;
  }

  /**
   * Check if user has required role
   */
  static requireRole(role) {
    if (!window.authService) {
      console.warn("⚠️ AuthService not loaded");
      return false;
    }
    if (!this.requireAuth()) {
      return false;
    }

    if (!authService.hasRole(role)) {
      // Redirect to unauthorized page or home
      window.location.href = "index.html";
      return false;
    }

    return true;
  }

  /**
   * Initialize user info in the UI
   */
  static async initUserInfo() {
    if (!window.authService) {
      console.warn("⚠️ AuthService not loaded");
      return;
    }
    const user = authService.getCurrentUser();
    if (!user) return;

    // Update UI with user info (you can customize this based on your layout)
    const userNameElements = document.querySelectorAll(".user-name");
    userNameElements.forEach((el) => {
      el.textContent = user.name || user.email;
    });

    const userEmailElements = document.querySelectorAll(".user-email");
    userEmailElements.forEach((el) => {
      el.textContent = user.email;
    });

    const userRoleElements = document.querySelectorAll(".user-role");
    userRoleElements.forEach((el) => {
      el.textContent = user.role || "User";
    });

    // Show/hide admin-only features
    this.updateAdminFeatures(user.role);
  }

  /**
   * Show or hide admin-only features based on user role
   */
  static updateAdminFeatures(role) {
    const isAdmin = role === "admin";

    // Show/hide staffs nav item
    const staffsNavItem = document.getElementById("staffsNavItem");
    if (staffsNavItem) {
      staffsNavItem.style.display = isAdmin ? "block" : "none";
      if (isAdmin) {
        console.log("✅ Admin access granted - Staffs tab visible");
      }
    }
  }

  /**
   * Setup logout buttons
   */
  static setupLogoutButtons() {
    const logoutButtons = document.querySelectorAll("[data-logout]");
    logoutButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        authService.logout();
      });
    });
  }
}

// Auto-initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    AuthGuard.setupLogoutButtons();
  });
} else {
  AuthGuard.setupLogoutButtons();
}
