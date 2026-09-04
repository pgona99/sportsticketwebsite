# 🗄️ Database Setup Demo & Guide

This guide shows you **exactly** how the database would work, so you can decide if you want it implemented.

---

## 📋 Table of Contents

1. **Database Overview** — What would be created
2. **Schema Design** — Table structures
3. **Setup Options** — Different ways to create it
4. **Code Integration** — How the app would use it
5. **Migration Example** — From mock data to real database

---

## 🎯 Option 1: PostgreSQL (Recommended)

### Why PostgreSQL?
- ✅ Most popular for Next.js + production
- ✅ Free and open-source
- ✅ Powerful & scalable
- ✅ Easy to backup

### Cost
- **Free:** Local development
- **Paid:** $15-30/month for production (Vercel PostgreSQL, Railway, etc.)

---

## 📊 Database Schema

### **Table 1: users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Table 2: events**
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  venue VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  total_tickets INT NOT NULL,
  available_tickets INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Table 3: cart_items**
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, event_id)
);
```

### **Table 4: orders**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Table 5: order_items**
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_id INT NOT NULL REFERENCES events(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

---

## ⚙️ Setup Option A: Local PostgreSQL

### Step 1: Install PostgreSQL
```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Or download from: https://www.postgresql.org/download/
```

### Step 2: Create Database
```bash
# Open PostgreSQL
psql postgres

# Create database
CREATE DATABASE sportsticket_db;
\c sportsticket_db

# Create tables (paste the schema above)
CREATE TABLE users (...);
CREATE TABLE events (...);
...
```

### Step 3: Install Database Client
```bash
npm install @prisma/client prisma
npx prisma init
```

### Step 4: Configure Connection
```env
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/sportsticket_db"
```

---

## ⚙️ Setup Option B: Vercel PostgreSQL (Production)

### Step 1: Connect to Vercel
```bash
# Login to Vercel
vercel login

# Link your project
vercel link
```

### Step 2: Add PostgreSQL
```bash
# Via Vercel dashboard
# Project Settings → Databases → Create Database → PostgreSQL
```

### Step 3: Environment Variables Auto-Configured
Vercel automatically sets:
```env
POSTGRES_URLPROVIDED=postgresql://...
```

---

## ⚙️ Setup Option C: Railway.app (Easiest)

### Cost: $5/month (very affordable)
1. Go to [railway.app](https://railway.app)
2. Create account
3. New Project → PostgreSQL
4. Copy connection string
5. Add to .env.local

---

## 💻 How Code Would Change

### **Before (Using Mock Data)**
```typescript
// app/api/events/route.ts
import { getEvents } from "@/lib/seed-data";

export async function GET(request: Request) {
  const events = getEvents();
  return NextResponse.json(events);
}
```

### **After (Using Database)**
```typescript
// app/api/events/route.ts
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const { rows } = await sql`SELECT * FROM events`;
  return NextResponse.json(rows);
}
```

---

## 🛠️ Using Prisma (Recommended ORM)

### Setup
```bash
npm install @prisma/client prisma
npx prisma init
```

### Prisma Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  passwordHash String
  name  String
  createdAt DateTime @default(now())
  cart  CartItem[]
  orders Order[]
}

model Event {
  id    Int     @id @default(autoincrement())
  name  String
  category String
  date  DateTime
  time  String
  location String
  price Float
  totalTickets Int
  availableTickets Int
  cartItems CartItem[]
  orderItems OrderItem[]
}

model CartItem {
  id    Int     @id @default(autoincrement())
  userId Int
  eventId Int
  quantity Int
  user  User    @relation(fields: [userId], references: [id])
  event Event   @relation(fields: [eventId], references: [id])
}

model Order {
  id    Int     @id @default(autoincrement())
  userId Int
  totalPrice Float
  status String @default("pending")
  user  User    @relation(fields: [userId], references: [id])
  items OrderItem[]
  createdAt DateTime @default(now())
}

model OrderItem {
  id    Int     @id @default(autoincrement())
  orderId Int
  eventId Int
  quantity Int
  price Float
  order Order   @relation(fields: [orderId], references: [id])
  event Event   @relation(fields: [eventId], references: [id])
}
```

### API with Prisma
```typescript
// app/api/events/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany();
  return NextResponse.json(events);
}
```

---

## 📊 API Changes Example

### GET /api/events (With Database)
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const where = category ? { category } : {};
  
  const events = await prisma.event.findMany({
    where,
    select: {
      id: true,
      name: true,
      date: true,
      location: true,
      price: true,
      category: true,
      availableTickets: true,
    },
  });

  return NextResponse.json(events);
}
```

### POST /api/auth/login (With Database)
```typescript
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Compare bcrypt hash
  const isValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
}
```

---

## 🚀 Migration Process

### Step 1: Install Prisma
```bash
npm install @prisma/client prisma
npx prisma init
```

### Step 2: Create Migrations
```bash
# Create migration from seed data
npx prisma migrate dev --name initial

# This seeds the database with events from seed-data.ts
```

### Step 3: Prisma CLI
```bash
# View database in UI
npx prisma studio

# Create migration after schema change
npx prisma migrate dev --name add_new_field

# Push schema to production
npx prisma db push
```

---

## 📋 Comparison: Mock vs Database

| Feature | Mock Data | Database |
|---------|-----------|----------|
| **Data Persistence** | ❌ Lost on restart | ✅ Permanent |
| **Multiple Users** | ❌ Limited | ✅ Unlimited |
| **Complex Queries** | ❌ Hard to implement | ✅ Easy with Prisma |
| **Real Carts/Orders** | ❌ No | ✅ Full functionality |
| **Performance** | ✅ Fast (small data) | ✅ Fast (indexed) |
| **Backups** | ❌ No | ✅ Yes |
| **Cost** | ✅ Free | 💰 $0-50/month |
| **Setup Time** | ✅ 5 mins | ⏱️ 15-30 mins |

---

## 🎯 What I Can Set Up For You

### **Option 1: Keep Mock Data (Current)**
- No database needed
- Perfect for demo/testing
- Good for deployment to Vercel
- ✅ Ready now

### **Option 2: Add PostgreSQL Locally**
- Full database setup on your Mac
- Prisma ORM integration
- Seed data migration
- ⏱️ ~30 minutes to implement

### **Option 3: Production Database**
- Railway.app or Vercel PostgreSQL
- Full migration from mock data
- Environment variables configured
- ⏱️ ~30 minutes to implement

### **Option 4: Both Local + Production**
- Local PostgreSQL for development
- Railway.app for production
- Automatic deployment pipeline
- ⏱️ ~45 minutes to implement

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| PostgreSQL (Local) | **Free** | On your machine |
| Vercel PostgreSQL | **$15/month** | Easiest with Vercel |
| Railway.app | **$5/month** | Very affordable |
| Supabase | **Free tier** | 500MB free database |
| Neon | **Free tier** | PostgreSQL with free tier |

---

## ✅ Recommendation

For a **production release**, I recommend:

1. **Keep mock data** for now (works great)
2. **Test on Vercel** without database
3. **Later add Railway.app** ($5/month) when you need persistent data

This way you:
- ✅ Deploy fast (no database config)
- ✅ Test on production
- ✅ Add database later when needed
- 💰 Save money initially

---

## 🤔 What Should I Do?

**Choose one:**

1. ✅ **Keep as-is** — Mock data works fine
2. 🗄️ **Set up local PostgreSQL** — Full database locally
3. 🌐 **Set up Railway.app** — Production-ready database
4. 🔄 **Set up both** — Local dev + production DB

Let me know your preference! 🚀
