# SportTicket - Project Specification

## Overview
SportTicket is a modern sports event ticketing platform built with Next.js 16, React 19, and TypeScript. It allows users to browse sporting events, add tickets to their cart, and manage their purchases.

---

## 🏗️ Project Structure

```
sportsticketwebsite/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── auth/
│   │   │   └── login/route.ts  # User authentication
│   │   ├── events/
│   │   │   ├── route.ts        # Get all events
│   │   │   └── [id]/route.ts   # Get single event
│   │   └── cart/route.ts       # Cart management
│   ├── components/
│   │   └── Navbar.tsx          # Navigation component
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── tailwind.config.mjs          # Tailwind CSS config
└── package.json
```

---

## 📄 Pages

### 1. **Home Page** (`/`)
- Hero section with "Your Next Game Awaits" heading
- Search bar for filtering events
- Featured events grid (6 sample events)
- Event cards with:
  - Sport category badge
  - Event name & location
  - Date
  - Price
  - "Buy Tickets" button
- Responsive design (mobile, tablet, desktop)

### 2. **Login Page** (`/login`)
- Email & password input fields
- Sign In button
- Error messages for invalid credentials
- Demo credentials displayed on the page
- Redirect to home on successful login
- User data stored in localStorage

---

## 🔌 API Endpoints

### **Authentication**

#### `POST /api/auth/login`
Login user with email and password.

**Request:**
```json
{
  "email": "demo@sportticket.com",
  "password": "demo123"
}
```

**Response (Success - 200):**
```json
{
  "id": 1,
  "email": "demo@sportticket.com",
  "name": "Demo User"
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid email or password"
}
```

---

### **Events**

#### `GET /api/events`
Fetch all events with optional category filtering.

**Query Parameters:**
- `category` (optional): Filter by sport category (e.g., "Basketball", "Football", "Soccer")

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Lakers vs Celtics",
    "date": "2026-09-15",
    "location": "Crypto.com Arena, Los Angeles",
    "price": 150,
    "image": "/events/basketball1.jpg",
    "category": "Basketball",
    "availableTickets": 127
  },
  ...
]
```

**Example:**
```
GET /api/events?category=Basketball
```

---

#### `GET /api/events/[id]`
Fetch details of a single event.

**Response (200):**
```json
{
  "id": 1,
  "name": "Lakers vs Celtics",
  "date": "2026-09-15",
  "location": "Crypto.com Arena, Los Angeles",
  "price": 150,
  "image": "/events/basketball1.jpg",
  "category": "Basketball",
  "description": "NBA Championship finals game",
  "totalTickets": 500,
  "availableTickets": 127
}
```

**Response (Error - 404):**
```json
{
  "error": "Event not found"
}
```

---

### **Shopping Cart**

#### `GET /api/cart`
Retrieve current cart items.

**Response (200):**
```json
{
  "items": [
    {
      "eventId": 1,
      "quantity": 2,
      "price": 150
    }
  ],
  "total": 300,
  "itemCount": 2
}
```

---

#### `POST /api/cart`
Add, remove, or clear cart items.

**Add Item Request:**
```json
{
  "eventId": 1,
  "quantity": 2,
  "price": 150,
  "action": "add"
}
```

**Remove Item Request:**
```json
{
  "eventId": 1,
  "action": "remove"
}
```

**Clear Cart Request:**
```json
{
  "action": "clear"
}
```

**Response (200):**
```json
{
  "message": "Item added to cart",
  "cart": [...]
}
```

---

## 👤 Demo Credentials

### Account 1 (Primary)
| Field | Value |
|-------|-------|
| Email | demo@sportticket.com |
| Password | demo123 |
| Name | Demo User |

### Account 2 (Alternative)
| Field | Value |
|-------|-------|
| Email | user@sportticket.com |
| Password | password123 |
| Name | John Doe |

---

## 🎫 Sample Events

| ID | Event | Date | Location | Price | Category |
|----|-------|------|----------|-------|----------|
| 1 | Lakers vs Celtics | 2026-09-15 | Crypto.com Arena, LA | $150 | Basketball |
| 2 | Yankees vs Red Sox | 2026-09-20 | Yankee Stadium, NY | $85 | Baseball |
| 3 | Cowboys vs Eagles | 2026-09-22 | AT&T Stadium, TX | $200 | Football |
| 4 | Man United vs Liverpool | 2026-10-01 | Old Trafford, UK | $120 | Soccer |
| 5 | Warriors vs Heat | 2026-10-05 | Chase Center, SF | $175 | Basketball |
| 6 | US Open Final | 2026-10-10 | Arthur Ashe Stadium, NY | $350 | Tennis |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.3.4
- **Runtime:** React 19.2.8
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9
- **Package Manager:** npm

---

## 🚀 Getting Started

### Installation
```bash
cd sportsticketwebsite
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 🎨 Design & Styling

- **Color Scheme:** Dark theme with blue/purple accents
  - Background: Black, Slate 900, Slate 800
  - Accent: Blue 600, Purple 600
  - Text: White, Slate 300, Slate 400

- **Typography:** Geist font family (Google Fonts)

- **Layout:** Responsive grid system
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns

- **Components:**
  - Navbar: Sticky, dark background
  - Cards: Hover scale animation (1.05x)
  - Buttons: Rounded with hover effects
  - Forms: Smooth focus states with ring effects

---

## 📋 Features Implemented

✅ User Authentication (Login)
✅ Event Listing & Browsing
✅ Event Details Page (API ready)
✅ Shopping Cart (API ready)
✅ Responsive Design
✅ Dark Theme UI
✅ Category Filtering (API ready)
✅ Error Handling
✅ TypeScript Support

---

## 🔜 Future Features (Not Yet Implemented)

- ❌ User Registration/Sign Up
- ❌ Event Detail Pages (`/events/[id]`)
- ❌ Checkout Process
- ❌ Payment Integration (Stripe)
- ❌ Order History
- ❌ User Profile Management
- ❌ Email Verification
- ❌ Database Integration (PostgreSQL)
- ❌ Admin Dashboard
- ❌ Seat Selection/Reservation

---

## 📝 Environment Variables

Currently using mock data. For production:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
STRIPE_API_KEY=your_stripe_key
```

---

## 🧪 Testing

No tests configured yet. Recommended tools:
- Jest (unit tests)
- Cypress or Playwright (E2E tests)

---

## 📞 Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📄 License

Private project - All rights reserved.

---

**Last Updated:** 2026-08-31
**Version:** 0.1.0
