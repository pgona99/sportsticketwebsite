"use client";

import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

interface CartEntry {
  eventId: number;
  quantity: number;
  price: number;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });

    fetchCart();
  }, []);

  const handleAddToCart = async (event: Event) => {
    try {
      setCartLoading(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity: 1,
          price: event.price,
          action: "add",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      await fetchCart();
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleRemoveFromCart = async (eventId: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          action: "remove",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      await fetchCart();
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const cartItems = cart
    .map((entry) => {
      const event = events.find((item) => item.id === entry.eventId);
      if (!event) return null;
      return {
        ...entry,
        name: event.name,
        total: entry.quantity * entry.price,
      };
    })
    .filter(Boolean) as Array<{
      eventId: number;
      quantity: number;
      price: number;
      name: string;
      total: number;
    }>;

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Next Game Awaits
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Book tickets to the biggest sporting events
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <input
                type="text"
                placeholder="Search events..."
                className="px-4 py-3 rounded-lg text-black w-80 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
                Search
              </button>
            </div>
          </div>
        </section>

        <section id="events" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Featured Events</h2>

            {loading ? (
              <div className="text-center py-12">Loading events...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 flex items-center justify-center text-4xl">
                      🏟️
                    </div>
                    <div className="p-6">
                      <span className="text-blue-400 text-sm font-semibold">
                        {event.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-2">{event.name}</h3>
                      <p className="text-slate-400 mt-2">📍 {event.location}</p>
                      <p className="text-slate-400 mt-1">📅 {event.date}</p>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-2xl font-bold text-green-400">
                          ${event.price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(event)}
                          disabled={cartLoading}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-4 py-2 rounded-lg transition"
                        >
                          Buy Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="cart" className="py-16 px-4">
          <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Your Cart</h2>
              <span className="text-slate-300">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s)
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-slate-400 text-center py-8">
                Your cart is empty. Add a few tickets to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.eventId}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-700 rounded-lg p-4"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-slate-400">
                        {item.quantity} x ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-green-400">
                        ${item.total}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.eventId)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-slate-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-lg text-slate-300">Subtotal</div>
                  <div className="text-3xl font-bold text-green-400">${subtotal}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="bg-slate-900 py-8 px-4 mt-16 text-center text-slate-400">
          <p>&copy; 2026 SportTicket. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
