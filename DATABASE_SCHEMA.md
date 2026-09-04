# 🔌 Database Architecture Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                      SPORTSTICKET DATABASE                       │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │      USERS       │
    ├──────────────────┤
    │ id (PK)          │
    │ email (UNIQUE)   │
    │ password_hash    │
    │ name             │
    │ created_at       │
    │ updated_at       │
    └────────┬─────────┘
             │
        ┌────┴───────┬─────────────────┐
        │            │                 │
        │            ▼                 │
        │   ┌─────────────────────┐    │
        │   │   CART_ITEMS        │    │
        │   ├─────────────────────┤    │
        │   │ id (PK)             │    │
        │   │ user_id (FK)        │────┤ 1:many
        │   │ event_id (FK)       │    │
        │   │ quantity            │    │
        │   │ price               │    │
        │   └─────────┬───────────┘    │
        │             │                │
        │             ▼                │
        │   ┌──────────────────────┐   │
        │   │      EVENTS          │   │
        │   ├──────────────────────┤   │
        │   │ id (PK)              │   │
        │   │ name                 │   │
        │   │ category             │   │
        │   │ date                 │   │
        │   │ time                 │   │
        │   │ location             │   │
        │   │ price                │   │
        │   │ total_tickets        │   │
        │   │ available_tickets    │   │
        │   │ created_at           │   │
        │   └──────────┬───────────┘   │
        │              │               │
        │              ▼               │
        │   ┌─────────────────────┐    │
        │   │   ORDER_ITEMS       │    │
        │   ├─────────────────────┤    │
        │   │ id (PK)             │    │
        │   │ order_id (FK)       │    │
        │   │ event_id (FK)───────┼────┤ many:1
        │   │ quantity            │    │
        │   │ price               │    │
        │   └──────────┬──────────┘    │
        │              │               │
        │              ▼               │
        │   ┌─────────────────────┐    │
        │   │     ORDERS          │    │
        │   ├─────────────────────┤    │
        │   │ id (PK)             │    │
        │   │ user_id (FK)────────┼────┤ 1:many
        │   │ total_price         │    │
        │   │ status              │    │
        │   │ created_at          │    │
        │   │ updated_at          │    │
        │   └─────────────────────┘    │
        │                              │
        └──────────────────────────────┘
```

---

## 📊 Table Details

### **USERS** (Demo Accounts)
```
Stores user information and authentication
Relationships: Has many orders, has many cart items

Rows (initial data):
┌─────┬──────────────────────┬─────────────────────┬───────────┐
│ id  │ email                │ name                │ created_at│
├─────┼──────────────────────┼─────────────────────┼───────────┤
│ 1   │ demo@sportticket.com │ Demo User           │ 2026-01-01│
│ 2   │ user@sportticket.com │ John Doe            │ 2026-01-02│
│ 3   │ jane@sportticket.com │ Jane Smith          │ 2026-01-03│
└─────┴──────────────────────┴─────────────────────┴───────────┘
```

### **EVENTS** (6 Sample Events)
```
Stores all sporting events available for booking
No relationships (source data for orders/cart)

Rows (initial data):
┌────┬───────────────────────┬────────────┬────────┬───────┐
│ id │ name                  │ category   │ price  │ avail │
├────┼───────────────────────┼────────────┼────────┼───────┤
│ 1  │ Lakers vs Celtics     │ Basketball │ $150   │ 127   │
│ 2  │ Yankees vs Red Sox    │ Baseball   │ $85    │ 342   │
│ 3  │ Cowboys vs Eagles     │ Football   │ $200   │ 89    │
│ 4  │ Man United vs Liv     │ Soccer     │ $120   │ 156   │
│ 5  │ Warriors vs Heat      │ Basketball │ $175   │ 203   │
│ 6  │ US Open Final         │ Tennis     │ $350   │ 45    │
└────┴───────────────────────┴────────────┴────────┴───────┘
```

### **CART_ITEMS** (Shopping Carts)
```
Stores items in user shopping carts
Relationships: user_id → USERS.id, event_id → EVENTS.id

Example row:
┌────┬─────────┬──────────┬──────────┬────────┐
│ id │ user_id │ event_id │ quantity │ price  │
├────┼─────────┼──────────┼──────────┼────────┤
│ 1  │ 1       │ 1        │ 2        │ 150.00 │
│ 2  │ 1       │ 3        │ 1        │ 200.00 │
└────┴─────────┴──────────┴──────────┴────────┘
(User 1 has 2 Lakers tickets + 1 Cowboys ticket in cart)
```

### **ORDERS** (Purchase History)
```
Stores completed purchases
Relationships: user_id → USERS.id, has many ORDER_ITEMS

Example row:
┌────┬─────────┬──────────────┬──────────┬──────────────────┐
│ id │ user_id │ total_price  │ status   │ created_at       │
├────┼─────────┼──────────────┼──────────┼──────────────────┤
│ 1  │ 2       │ 425.00       │ completed│ 2026-08-30 18:45 │
│ 2  │ 1       │ 150.00       │ pending  │ 2026-08-31 10:20 │
└────┴─────────┴──────────────┴──────────┴──────────────────┘
```

### **ORDER_ITEMS** (Order Details)
```
Stores individual items within each order
Relationships: order_id → ORDERS.id, event_id → EVENTS.id

Example row:
┌────┬──────────┬──────────┬──────────┬────────┐
│ id │ order_id │ event_id │ quantity │ price  │
├────┼──────────┼──────────┼──────────┼────────┤
│ 1  │ 1        │ 1        │ 2        │ 150.00 │
│ 2  │ 1        │ 3        │ 1        │ 200.00 │
└────┴──────────┴──────────┴──────────┴────────┘
(Order 1 contains 2 Lakers tickets + 1 Cowboys ticket)
```

---

## 🔑 Primary & Foreign Keys

```
USERS
  └─ id (PK) ─────────┬─────→ CART_ITEMS.user_id (FK)
                      └─────→ ORDERS.user_id (FK)

EVENTS
  ├─ id (PK) ─────────┬─────→ CART_ITEMS.event_id (FK)
                      └─────→ ORDER_ITEMS.event_id (FK)

CART_ITEMS
  └─ id (PK)

ORDERS
  └─ id (PK) ──────────→ ORDER_ITEMS.order_id (FK)

ORDER_ITEMS
  └─ id (PK)
```

---

## 📈 Query Examples (Once Database is Created)

### **Get all events in a category**
```sql
SELECT * FROM events WHERE category = 'Basketball';
```

### **Get user's cart**
```sql
SELECT 
  ci.quantity,
  e.name,
  e.price,
  (ci.quantity * e.price) as subtotal
FROM cart_items ci
JOIN events e ON ci.event_id = e.id
WHERE ci.user_id = 1;
```

### **Get user's order history**
```sql
SELECT 
  o.id,
  o.total_price,
  o.status,
  COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 1
GROUP BY o.id;
```

### **Update available tickets after purchase**
```sql
UPDATE events 
SET available_tickets = available_tickets - 1 
WHERE id = 1 AND available_tickets > 0;
```

---

## 🔐 Indexes for Performance

```sql
-- Speed up common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_cart_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

---

## 📊 Data Flow Example

```
USER JOURNEY:
1. Browse events → SELECT * FROM events
2. Add to cart → INSERT INTO cart_items
3. View cart → JOIN cart_items + events
4. Checkout → INSERT INTO orders + INSERT INTO order_items
5. Delete from cart → DELETE FROM cart_items
6. View history → SELECT * FROM orders WHERE user_id = X
```

---

## 🎯 Next Steps

If you decide to add database:

1. Choose provider (PostgreSQL Local, Railway, or Vercel)
2. Create database using schema above
3. Install Prisma ORM
4. Run migrations
5. Update API endpoints to use Prisma
6. Seed with initial data

**Estimated time:** 30-45 minutes

---

**Let me know if you want me to implement the database! 🚀**
