"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import EventHeroSection from "@/components/event/EventHeroSection";
import EventListSection, {
  type EventItem,
} from "@/components/event/EventListSection";
import EventBenefitSection from "@/components/event/EventBenefitSection";
import Footer from "@/components/common/Footer";

async function getEvents(): Promise<EventItem[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?status=published&limit=100`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    if (!data.success || !data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default function EventPage() {
  const { data: events, isLoading: isEventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <EventHeroSection />
      <EventBenefitSection />
      <EventListSection items={events || []} isLoading={isEventsLoading} />
      <Footer />
    </main>
  );
}
