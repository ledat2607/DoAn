import React, { useEffect, useState } from "react";
import EventCard from "./EventCard.jsx";
import styles from "../../../styles/styles.js";
import { useSelector } from "react-redux";
const Events = () => {
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
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Sự kiện nổi bật</h1>
        </div>
        <div className="w-full grid">
          <EventCard data={sortedEvents[0]} />
        </div>
      </div>
    </div>
  );
};

export default Events;
