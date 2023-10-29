import React, { useEffect, useState } from "react";
import EventCard from "./EventCard.jsx";
import styles from "../../../styles/styles.js";
import { useSelector } from "react-redux";
const Events = () => {
  const { allEvents } = useSelector((state) => state.events);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    if (allEvents) {
      // Sắp xếp allEvents theo thuộc tính sold_out (giảm dần)
      const sortedEvents = allEvents
        .slice()
        .sort((a, b) => b.sold_out - a.sold_out);
      setSortedEvents(sortedEvents);
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
