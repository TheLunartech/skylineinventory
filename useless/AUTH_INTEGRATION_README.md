# Authentication Integration Guide

## Overview

This frontend is now integrated with the NestJS backend authentication API. The integration includes:

- User login with JWT tokens
- Token refresh mechanism
- Password reset flow
- Email verification
- Authentication guards for protected pages

## Files Added

### 1. `/assets/js/config.js`

Configuration file containing API base URL and endpoints.

**Important:** Update `API_CONFIG.BASE_URL` to match your backend server:

```javascript
BASE_URL: "http://localhost:3000/api"; // Update this based on your environment
```

### 2. `/assets/js/auth-service.js`

Authentication service that handles:

- Login/logout
- Token management (localStorage)
- Password reset requests
- Email verification
- Authenticated API requests with auto token refresh

### 3. `/assets/js/auth-guard.js`

Protection for authenticated pages:

- Redirects to signin if not authenticated
- Role-based access control
- Auto-setup logout buttons

## Integrated Pages

### ✅ Sign In (`signin.html`)

- Email and password login
- Connects to `POST /api/auth/login`
- Stores JWT tokens in localStorage
- Redirects to dashboard on success
- Auto-redirects if already logged in

### ✅ Forgot Password (`forgot-password.html`)

- Request password reset link
- Connects to `POST /api/auth/forgot-password`
- Shows success message (doesn't reveal if email exists)

### ✅ Email Verification (`verification.html`)

- Handles email verification from link
- Connects to `GET /api/auth/verify-email?token=xxx`
- Auto-redirects to signin after success

## How to Protect Pages

To protect any page (require authentication), add this at the end of the page before `</body>`:

```html
<!-- Auth Protection -->
<script src="./assets/js/config.js"></script>
<script src="./assets/js/auth-service.js"></script>
<script src="./assets/js/auth-guard.js"></script>
<script>
  // Require authentication
  AuthGuard.requireAuth();

  // Initialize user info in UI
  AuthGuard.initUserInfo();
</script>
```

## Making Authenticated API Requests

Example of calling authenticated endpoints:

```javascript
// Get current user profile
authService
  .getProfile()
  .then((user) => {
    console.log("Current user:", user);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Make custom authenticated request
authService
  .apiRequest("/containers", {
    method: "GET",
  })
  .then((data) => {
    console.log("Containers:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Testing the Integration

### Prerequisites

1. Backend server must be running (default: `http://localhost:3000`)
2. Database must be set up and populated
3. Email service configured (for password reset and verification)

### Test Steps

#### 1. Test Login

1. Open `signin.html` in browser
2. Enter valid credentials (email and password)
3. Click "Sign In"
4. Should redirect to `index.html` with tokens stored
5. Check browser console for any errors
6. Check localStorage for tokens:
   ```javascript
   localStorage.getItem("accessToken");
   localStorage.getItem("refreshToken");
   localStorage.getItem("currentUser");
   ```

#### 2. Test Forgot Password

1. Open `forgot-password.html`
2. Enter registered email
3. Click "Forget Password"
4. Check email inbox for reset link
5. Should see success message

#### 3. Test Email Verification

1. After user registration, check email
2. Click verification link (will open `verification.html?token=xxx`)
3. Should see success message
4. Auto-redirects to signin page

#### 4. Test Protected Page

1. Logout (clear localStorage)
2. Try to access a protected page
3. Should redirect to `signin.html`
4. Login and try again
5. Should access page successfully

## Backend API Endpoints Used

### Authentication

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-email` - Verify email with token

### User

- `GET /api/users/me` - Get current user profile
- `GET /api/users` - List users (admin only)
- `POST /api/users` - Create user (admin only)

## Token Management

### Access Token

- Stored in `localStorage.accessToken`
- Valid for 15 minutes
- Sent in `Authorization: Bearer <token>` header
- Auto-refreshed when expired

### Refresh Token

- Stored in `localStorage.refreshToken`
- Valid for 7 days
- Used to obtain new access tokens
- Auto-cleared on logout

### Current User

- Stored in `localStorage.currentUser` (JSON)
- Contains user info (id, email, name, role, etc.)
- Used for UI display and role checks

## User Roles

The system supports role-based access:

- `ADMIN` - Full access
- `MANAGER` - Limited management access
- `STAFF` - Basic access

Check roles in code:

```javascript
// Check if user is admin
if (authService.isAdmin()) {
  // Show admin features
}

// Check specific role
if (authService.hasRole("MANAGER")) {
  // Show manager features
}
```

## Logout

Add logout button with `data-logout` attribute:

```html
<button data-logout>Logout</button>
```

Or call logout programmatically:

```javascript
authService.logout();
```

## Troubleshooting

### CORS Errors

- Ensure backend CORS is configured to allow frontend origin
- Check `ALLOWED_ORIGINS` in backend `.env`

### 401 Unauthorized

- Token may be expired or invalid
- Try logging out and logging in again
- Check if email is verified

### Network Errors

- Verify backend server is running
- Check `API_CONFIG.BASE_URL` in `config.js`
- Check browser console for errors

### Tokens Not Saving

- Check browser's localStorage permissions
- Try incognito/private mode
- Clear browser cache and try again

## Next Steps

To complete the integration for other modules:

1. Create API client services for each module (containers, customers, shipments, etc.)
2. Update table pages to fetch data from backend
3. Update forms to submit data to backend
4. Add loading states and error handling
5. Implement real-time updates if needed

## Security Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Always use HTTPS in production
- Implement CSRF protection for state-changing operations
- Rate limiting is handled by backend (Throttle guards)
- Validate and sanitize all user inputs

