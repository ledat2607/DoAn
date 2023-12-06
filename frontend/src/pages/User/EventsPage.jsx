import React, { useEffect, useState } from "react";
import Headers from "../../components/Layout/Header";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
const EventsPage = () => {
  const { allEvents } = useSelector((state) => state.events);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    if (allEvents) {
      const currentDate = new Date();

      // Filter events based on status is "Đang diễn ra"
      const filteredEvents = allEvents.filter(
        (event) =>
          event.status === "Đang diễn ra" &&
          new Date(event.Finish_Date) > currentDate
      );

      // Sort filteredEvents by sold_out in descending order
      filteredEvents.sort((a, b) => b.sold_out - a.sold_out);

      setSortedEvents(filteredEvents);
    }
  }, [allEvents]);

  return (
    <div>
      <Headers activeHeading={4} />
      <div className="mt-[1%]">
        <EventCard active={true} data={sortedEvents[0]} />
      </div>
    </div>
  );
};

export default EventsPage;
