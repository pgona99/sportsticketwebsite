# 🌱 Seed Data Guide

## Overview

Seed data is pre-configured data used to populate your application. The SportTicket project includes:

- **6 sporting events** (Basketball, Baseball, Football, Soccer, Tennis)
- **3 demo user accounts** for testing authentication
- **Helper functions** for querying data

---

## 📁 Location

```
lib/seed-data.ts
```

This is the **single source of truth** for all mock/test data.

---

## 🗂️ Data Structure

### **Events**
```typescript
{
  id: number
  name: string
  date: string (YYYY-MM-DD)
  time: string (HH:MM)
  location: string
  price: number
  image: string
  category: string
  description: string
  totalTickets: number
  availableTickets: number
  venue: string
  city: string
  state: string
  country: string
}
```

### **Users**
```typescript
{
  id: number
  email: string
  password: string
  name: string
  createdAt: string
}
```

---

## 👥 Demo Accounts

All passwords are stored in plaintext for development. **Use bcrypt in production!**

| Email | Password | Name |
|-------|----------|------|
| demo@sportticket.com | demo123 | Demo User |
| user@sportticket.com | password123 | John Doe |
| jane@sportticket.com | password123 | Jane Smith |

---

## 💻 Usage Examples

### **In API Routes**

```typescript
// app/api/events/route.ts
import { getEvents } from "@/lib/seed-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  const events = getEvents(category || undefined);
  return NextResponse.json(events);
}
```

### **In Components**

```typescript
// app/components/EventList.tsx
"use client";

import { events } from "@/lib/seed-data";

export function EventList() {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}
```

### **Available Functions**

```typescript
import {
  events,              // Array of all events
  users,               // Array of all users
  categories,          // Array of sport categories
  getEventById,        // Get single event by ID
  getEvents,           // Get all events or filtered by category
  getUserByEmail,      // Find user by email
  getUserById,         // Find user by ID
  authenticateUser,    // Login user (email + password)
} from "@/lib/seed-data";

// Examples
const event = getEventById(1);
const allBasketballEvents = getEvents("Basketball");
const user = getUserByEmail("demo@sportticket.com");
const authenticatedUser = authenticateUser("demo@sportticket.com", "demo123");
```

---

## 🗄️ Migrating to Database

When you're ready to use a real database (PostgreSQL, MongoDB, etc.):

### **Step 1: Export seed data to JSON/SQL**
```bash
# Example: Convert to SQL INSERT statements
node scripts/seed-to-sql.js
```

### **Step 2: Update imports in API routes**
```typescript
// Before (seed-data.ts)
import { getEvents } from "@/lib/seed-data";

// After (database)
import { getEvents } from "@/lib/db";
```

### **Step 3: Keep seed-data.ts for tests**
Keep this file for unit tests and local development:
```typescript
import { events } from "@/lib/seed-data";

test("filter events by category", () => {
  const basketball = events.filter(e => e.category === "Basketball");
  expect(basketball.length).toBe(2);
});
```

---

## 🔄 Events Included

| # | Event | Category | Price | Tickets |
|---|-------|----------|-------|---------|
| 1 | Lakers vs Celtics | Basketball | $150 | 127/500 |
| 2 | Yankees vs Red Sox | Baseball | $85 | 342/1000 |
| 3 | Cowboys vs Eagles | Football | $200 | 89/800 |
| 4 | Man United vs Liverpool | Soccer | $120 | 156/700 |
| 5 | Warriors vs Heat | Basketball | $175 | 203/450 |
| 6 | US Open Final | Tennis | $350 | 45/250 |

---

## ⚙️ Configuration

### Add New Event
```typescript
// lib/seed-data.ts
export const events = [
  // ... existing events
  {
    id: 7,
    name: "New Event",
    date: "2026-11-01",
    time: "19:00",
    location: "Stadium, City",
    price: 100,
    image: "/events/new.jpg",
    category: "Basketball",
    description: "Event description",
    totalTickets: 500,
    availableTickets: 250,
    venue: "Stadium",
    city: "City",
    state: "ST",
    country: "Country",
  },
];
```

### Add New User
```typescript
export const users = [
  // ... existing users
  {
    id: 4,
    email: "newuser@sportticket.com",
    password: "password123",
    name: "New User",
    createdAt: "2026-01-04",
  },
];
```

### Add New Category
```typescript
export const categories = [
  // ... existing categories
  "Rugby",
  "Cricket",
];
```

---

## 🚨 Important Notes

⚠️ **Development Only:**
- Passwords stored as plaintext (for dev convenience)
- Data reset on server restart (no persistence)
- No data validation in mock API

✅ **For Production:**
- Use proper database (PostgreSQL, MongoDB)
- Hash passwords with bcrypt
- Implement data validation
- Add error handling
- Use environment variables for secrets

---

## 📖 Related Files

- [lib/seed-data.ts](../lib/seed-data.ts) — Seed data definitions
- [app/api/events/route.ts](../app/api/events/route.ts) — Events API
- [app/api/auth/login/route.ts](../app/api/auth/login/route.ts) — Auth API
- [SPEC.md](../SPEC.md) — Full specification

---

**Last Updated:** 2026-08-31  
**Version:** 0.1.0
