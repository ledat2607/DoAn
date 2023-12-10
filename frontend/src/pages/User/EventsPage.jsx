import React, { useEffect, useState } from "react";
import Headers from "../../components/Layout/Header";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
const EventsPage = () => {
  const { allEvents } = useSelector((state) => state.events);
  const [sortedEvents, setSortedEvents] = useState([]);

  const [headerState, setHeaderState] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setHeaderState(storedTheme);
    } else {
      setHeaderState("light");
    }
  }, []);

  const handleHeaderChange = (newHeaderState) => {
    setHeaderState(newHeaderState);
    localStorage.setItem("theme", newHeaderState);
  };
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
    <div
      className={`w-full 800px:h-[150vh] ${
        headerState === "dark"
          ? "bg-[#3c3b3b] text-gray-400 opacity-9 brightness-75"
          : "bg-gray-100"
      }`}
    >
      <Headers activeHeading={4} onHeaderChange={handleHeaderChange} />
      <div className="mt-[1%]">
        <EventCard active={true} data={sortedEvents[0]} />
      </div>
    </div>
  );
};

export default EventsPage;
