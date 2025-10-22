/**
 * API Loader
 * Loads all API service scripts in the correct order
 *
 * Usage: Include this script in your HTML pages to load all APIs
 * <script src="./assets/js/api-loader.js"></script>
 */

(function () {
  const apiScripts = [
    // Core authentication and config (if not already loaded)
    "./assets/js/config.js",
    "./assets/js/auth-service.js",
    "./assets/js/auth-guard.js",

    // API modules
    "./assets/js/api/containers-api.js",
    "./assets/js/api/customers-api.js",
    "./assets/js/api/shipments-api.js",
    "./assets/js/api/warehouses-api.js",
    "./assets/js/api/dashboard-api.js",
    "./assets/js/api/tracking-api.js",
    "./assets/js/api/reports-api.js",
    "./assets/js/api/documents-api.js",
    "./assets/js/api/users-api.js",
  ];

  // Check if script is already loaded
  function isScriptLoaded(src) {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.includes(src)) {
        return true;
      }
    }
    return false;
  }

  // Load scripts sequentially
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // Skip if already loaded
      if (isScriptLoaded(src)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  // Load all scripts
  async function loadAllAPIs() {
    try {
      for (const src of apiScripts) {
        await loadScript(src);
      }
      console.log("✅ All API services loaded successfully");

      // Dispatch event when all APIs are loaded
      window.dispatchEvent(new Event("apisLoaded"));
    } catch (error) {
      console.error("❌ Error loading API services:", error);
      // Still dispatch the event so apps can use fallback data
      window.dispatchEvent(new Event("apisLoaded"));
    }
  }

  // Start loading when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAllAPIs);
  } else {
    loadAllAPIs();
  }
})();
