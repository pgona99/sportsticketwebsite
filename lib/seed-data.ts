/**
 * Seed Data - SportTicket Events
 * 
 * This file contains all mock/seed data for the application.
 * Use this for:
 * - API development and testing
 * - Database seeding in production
 * - Demo accounts
 * 
 * Import: import { events, users } from '@/lib/seed-data'
 */

export const users = [
  {
    id: 1,
    email: "demo@sportticket.com",
    password: "demo123", // For dev only - use bcrypt in production
    name: "Demo User",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    email: "user@sportticket.com",
    password: "password123", // For dev only - use bcrypt in production
    name: "John Doe",
    createdAt: "2026-01-02",
  },
  {
    id: 3,
    email: "jane@sportticket.com",
    password: "password123",
    name: "Jane Smith",
    createdAt: "2026-01-03",
  },
];

export const events = [
  {
    id: 1,
    name: "Lakers vs Celtics",
    date: "2026-09-15",
    time: "19:00",
    location: "Crypto.com Arena, Los Angeles",
    price: 150,
    image: "/events/basketball1.jpg",
    category: "Basketball",
    description: "NBA Championship finals game - Lakers take on the legendary Celtics in an epic showdown",
    totalTickets: 500,
    availableTickets: 127,
    venue: "Crypto.com Arena",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
  },
  {
    id: 2,
    name: "Yankees vs Red Sox",
    date: "2026-09-20",
    time: "18:30",
    location: "Yankee Stadium, New York",
    price: 85,
    image: "/events/baseball1.jpg",
    category: "Baseball",
    description: "AL East rivalry game - Classic matchup between two historic teams",
    totalTickets: 1000,
    availableTickets: 342,
    venue: "Yankee Stadium",
    city: "New York",
    state: "NY",
    country: "USA",
  },
  {
    id: 3,
    name: "Cowboys vs Eagles",
    date: "2026-09-22",
    time: "20:00",
    location: "AT&T Stadium, Arlington",
    price: 200,
    image: "/events/football1.jpg",
    category: "Football",
    description: "NFC East showdown - High-octane clash in the heartland of Texas",
    totalTickets: 800,
    availableTickets: 89,
    venue: "AT&T Stadium",
    city: "Arlington",
    state: "TX",
    country: "USA",
  },
  {
    id: 4,
    name: "Manchester United vs Liverpool",
    date: "2026-10-01",
    time: "15:00",
    location: "Old Trafford, Manchester",
    price: 120,
    image: "/events/soccer1.jpg",
    category: "Soccer",
    description: "Premier League classic match - England's fiercest rivalry",
    totalTickets: 700,
    availableTickets: 156,
    venue: "Old Trafford",
    city: "Manchester",
    state: "England",
    country: "UK",
  },
  {
    id: 5,
    name: "Golden State Warriors vs Miami Heat",
    date: "2026-10-05",
    time: "19:30",
    location: "Chase Center, San Francisco",
    price: 175,
    image: "/events/basketball2.jpg",
    category: "Basketball",
    description: "Western Conference battle - Warriors face Heat in intense matchup",
    totalTickets: 450,
    availableTickets: 203,
    venue: "Chase Center",
    city: "San Francisco",
    state: "CA",
    country: "USA",
  },
  {
    id: 6,
    name: "US Open Final",
    date: "2026-10-10",
    time: "14:00",
    location: "Arthur Ashe Stadium, New York",
    price: 350,
    image: "/events/tennis1.jpg",
    category: "Tennis",
    description: "Grand Slam Championship - The pinnacle of tennis excellence",
    totalTickets: 250,
    availableTickets: 45,
    venue: "Arthur Ashe Stadium",
    city: "New York",
    state: "NY",
    country: "USA",
  },
];

export const categories = [
  "Basketball",
  "Baseball",
  "Football",
  "Soccer",
  "Tennis",
  "Hockey",
  "Golf",
  "Boxing",
];

/**
 * Get event by ID
 */
export function getEventById(id: number) {
  return events.find((event) => event.id === id);
}

/**
 * Get all events or filter by category
 */
export function getEvents(category?: string) {
  if (category) {
    return events.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    );
  }
  return events;
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

/**
 * Get user by ID
 */
export function getUserById(id: number) {
  return users.find((user) => user.id === id);
}

/**
 * Authenticate user
 */
export function authenticateUser(email: string, password: string) {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}
