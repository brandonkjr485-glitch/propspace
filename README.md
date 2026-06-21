# PropSpace 🏠
A full-stack property listing app — React + Node.js + Express + MongoDB.

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI and JWT_SECRET
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login |
| GET | /api/users/profile | Yes | Get my profile |
| PUT | /api/users/profile | Yes | Update profile |
| PUT | /api/users/change-password | Yes | Change password |
| GET | /api/properties | No | Browse all (filter: city, minPrice, maxPrice) |
| GET | /api/properties/my-listings | Yes | My own listings |
| GET | /api/properties/:id | No | Single property |
| POST | /api/properties | Yes | Create listing |
| PUT | /api/properties/:id | Yes | Update listing (owner only) |
| DELETE | /api/properties/:id | Yes | Delete listing (owner only) |

---

## Lecturer Requirements Checklist

### Backend Architecture
- [x] Route → Controller → Service → Repository → Model (4-layer pattern)
- [x] Separate app.js and server.js
- [x] utils/ folder with generateToken helper

### Authentication
- [x] User registration with unique email + username
- [x] Password salted and hashed with bcrypt
- [x] JWT generation with expiry (JWT_EXPIRES_IN env var)
- [x] Token expiry error handled (TokenExpiredError → 401)
- [x] protect middleware validates token on every protected route

### Account Management
- [x] GET /api/users/profile
- [x] PUT /api/users/profile (fullName, phone, avatar)
- [x] PUT /api/users/change-password (verifies old password first)

### Property Model
- [x] Schema: title, description, price, city, country, propertyType, images[], owner (ObjectId ref)
- [x] "owner" field used throughout (not "author")

### Property CRUD
- [x] GET /api/properties (public, filterable)
- [x] GET /api/properties/my-listings (protected, declared BEFORE /:id)
- [x] GET /api/properties/:id (public)
- [x] POST /api/properties (protected)
- [x] PUT /api/properties/:id (protected, 403 for non-owners)
- [x] DELETE /api/properties/:id (protected, 403 for non-owners)
- [x] 404 returned for nonexistent resources

### Search & Filtering
- [x] Filter by city (case-insensitive regex)
- [x] Filter by minPrice and maxPrice

### HTTP Status Codes
- [x] 200 OK, 201 Created, 400 Bad Request
- [x] 401 Unauthorized, 403 Forbidden, 404 Not Found

### Frontend Pages
- [x] Home (public feed)
- [x] Login
- [x] Register
- [x] Dashboard
- [x] My Listings
- [x] Create Property
- [x] Edit Property
- [x] Property Details
- [x] Profile Settings
- [x] Change Password

### Protected Routes
- [x] Dashboard, My Listings, Create, Edit, Profile, Change Password
- [x] Unauthenticated users redirected to /login

### Components
- [x] PropertyCard
- [x] FilterSidebar
- [x] InputField
- [x] Navbar
- [x] ProtectedRoute
- [x] Loading, ErrorMessage, EmptyState

### Global Auth
- [x] Centralized Axios instance with JWT request interceptor

### State Management
- [x] Every data-fetching page handles loading, error, and empty states

### Form Validation
- [x] Required fields
- [x] Email format
- [x] Positive prices
- [x] Password confirmation
- [x] At least one image URL

### React Lifecycle
- [x] All useEffect data-fetching hooks include AbortController cleanup

---

## Push to GitHub
```bash
cd propspace
git init
git add .
git commit -m "PropSpace - full-stack property listing app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/propspace.git
git push -u origin main
```
Make the repository **public** before submitting.
