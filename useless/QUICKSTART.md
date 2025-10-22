# 🚀 Quick Start - Authentication Integration

## What Was Integrated?

The frontend is now connected to your NestJS backend authentication system. You can now:

- ✅ Login with email/password
- ✅ Store and manage JWT tokens
- ✅ Make authenticated API requests
- ✅ Protect pages with authentication
- ✅ Handle password reset flow
- ✅ Verify user emails

## Files Created

```
frontend/skylineinventory/
├── assets/js/
│   ├── config.js              # API configuration
│   ├── auth-service.js        # Authentication service
│   └── auth-guard.js          # Page protection
├── demo-protected.html        # Demo protected page
├── AUTH_INTEGRATION_README.md # Full documentation
└── QUICKSTART.md             # This file
```

## Files Updated

- ✅ `signin.html` - Connected to backend login API
- ✅ `forgot-password.html` - Connected to password reset API
- ✅ `verification.html` - Email verification handler

## 🧪 Test It Now!

### Step 1: Start Your Backend

```bash
cd backend
npm run start:dev
# Backend should run on http://localhost:3000
```

### Step 2: Open Frontend

Open these pages in your browser:

#### Option A: Using Live Server (Recommended)

```bash
cd frontend/skylineinventory
# Use VS Code Live Server extension
# Or use: python -m http.server 8000
```

#### Option B: Open Directly

Just open the HTML files in your browser:

- `file:///path/to/frontend/skylineinventory/signin.html`

### Step 3: Test Login Flow

1. **Open Sign In Page**

   - Navigate to `signin.html`
   - Enter your credentials (email and password)
   - Click "Sign In"

2. **Check Success**

   - Should redirect to `index.html` (or saved page)
   - Open browser DevTools → Console
   - Check for "Login successful" message
   - Open DevTools → Application → Local Storage
   - You should see:
     - `accessToken`
     - `refreshToken`
     - `currentUser`

3. **Test Protected Page**

   - Open `demo-protected.html` in your browser
   - If not logged in, should redirect to `signin.html`
   - If logged in, should show:
     - Your user information
     - JWT tokens
     - Working API test buttons

4. **Test API Calls**

   - On `demo-protected.html`, click "Get Profile"
   - Should fetch and display your user profile
   - Click "Refresh Token"
   - Should get new tokens

5. **Test Logout**
   - Click "Logout" button
   - Should clear tokens and redirect to signin
   - Try accessing `demo-protected.html` again
   - Should redirect back to signin

### Step 4: Test Other Features

#### Forgot Password

1. Open `forgot-password.html`
2. Enter your email
3. Click "Forget Password"
4. Check your email inbox for reset link
5. Should see success message

#### Email Verification

1. After user registration (via backend)
2. Check email for verification link
3. Click link (opens `verification.html?token=xxx`)
4. Should see verification success
5. Auto-redirects to signin after 3 seconds

## 📝 Configuration

### Update Backend URL

Edit `assets/js/config.js`:

```javascript
const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api", // Change this!
  // ...
};
```

**Common configurations:**

- Local development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`
- Different port: `http://localhost:5000/api`

## 🔍 Troubleshooting

### Problem: Login shows CORS error

**Solution:**

1. Check backend `.env` file has:
   ```
   ALLOWED_ORIGINS=http://localhost:8000,http://localhost:5500
   ```
2. Add your frontend URL to `ALLOWED_ORIGINS`
3. Restart backend server

### Problem: Login returns 401 Unauthorized

**Possible causes:**

- Email not verified yet
- Account is inactive
- Wrong email/password
- User doesn't exist

**Solution:**

- Check backend logs
- Verify email first
- Create user via backend if needed

### Problem: Page doesn't redirect after login

**Solution:**

- Check browser console for errors
- Verify `index.html` exists
- Check if tokens are saved in localStorage

### Problem: "authService is not defined"

**Solution:**
Make sure scripts are loaded in correct order:

```html
<script src="./assets/js/config.js"></script>
<script src="./assets/js/auth-service.js"></script>
<script src="./assets/js/auth-guard.js"></script>
```

## 🎯 Next Steps

### 1. Protect More Pages

Add to any page that needs authentication:

```html
<!-- Before </body> -->
<script src="./assets/js/config.js"></script>
<script src="./assets/js/auth-service.js"></script>
<script src="./assets/js/auth-guard.js"></script>
<script>
  AuthGuard.requireAuth();
  AuthGuard.initUserInfo();
</script>
```

### 2. Make API Calls

Example - Fetch containers:

```javascript
authService
  .apiRequest("/containers", {
    method: "GET",
  })
  .then((containers) => {
    console.log("Containers:", containers);
    // Display in your UI
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### 3. Create More API Services

Create separate service files for each module:

- `containers-api.js` - Container operations
- `customers-api.js` - Customer operations
- `shipments-api.js` - Shipment operations
- etc.

Example structure:

```javascript
class ContainersAPI {
  async getAll() {
    return await authService.apiRequest("/containers", {
      method: "GET",
    });
  }

  async getById(id) {
    return await authService.apiRequest(`/containers/${id}`, {
      method: "GET",
    });
  }

  async create(data) {
    return await authService.apiRequest("/containers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

window.containersAPI = new ContainersAPI();
```

### 4. Update Forms

Connect your forms to backend:

```javascript
document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    // ... other fields
  };

  try {
    const result = await authService.apiRequest("/containers", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    alert("Created successfully!");
    // Reload list or redirect
  } catch (error) {
    alert("Error: " + error.message);
  }
});
```

## 📚 Resources

- **Full Documentation**: See `AUTH_INTEGRATION_README.md`
- **Backend API Docs**: Check your NestJS backend controllers
- **Demo Page**: Open `demo-protected.html` for working example

## ✅ Success Checklist

- [ ] Backend server is running
- [ ] Can open signin.html in browser
- [ ] Can login with valid credentials
- [ ] Tokens are saved in localStorage
- [ ] demo-protected.html shows user info
- [ ] Can click "Get Profile" and see data
- [ ] Can logout and login again
- [ ] Forgot password sends email
- [ ] No console errors

## 🆘 Need Help?

1. Check browser console for errors
2. Check backend logs
3. Verify API_CONFIG.BASE_URL is correct
4. Test backend API with Postman/Insomnia first
5. Check network tab in DevTools for failed requests

---

**Integration Status:** ✅ **Complete** - Authentication is fully integrated and ready to use!

