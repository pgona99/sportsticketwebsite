import { NextResponse } from "next/server";

// Mock cart storage - in production, use database + sessions
interface CartItem {
  eventId: number;
  quantity: number;
  price: number;
}

// Temporary in-memory storage (reset on server restart)
let cart: CartItem[] = [];

export async function GET(request: Request) {
  try {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return NextResponse.json(
      {
        items: cart,
        total,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, quantity, price, action } = body;

    if (action === "add") {
      const existingItem = cart.find((item) => item.eventId === eventId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ eventId, quantity, price });
      }

      return NextResponse.json(
        { message: "Item added to cart", cart },
        { status: 200 }
      );
    }

    if (action === "remove") {
      cart = cart.filter((item) => item.eventId !== eventId);

      return NextResponse.json(
        { message: "Item removed from cart", cart },
        { status: 200 }
      );
    }

    if (action === "clear") {
      cart = [];
      return NextResponse.json(
        { message: "Cart cleared", cart },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
