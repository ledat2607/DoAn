import React from "react";
import EventCard from "./EventCard.jsx"
import styles from "../../../styles/styles.js";
const Events = () => {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Sự kiện nổi bật</h1>
      </div>
      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
