import { NextResponse } from "next/server";
import { getEvents } from "@/lib/seed-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;

    const filteredEvents = getEvents(category || undefined);

    // Return only the necessary fields for the list view
    const events = filteredEvents.map(({ description, totalTickets, ...rest }) => rest);

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
