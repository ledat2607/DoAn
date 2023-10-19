import React from "react";
import Headers from "../../components/Layout/Header";
import EventCard from "../../components/Route/Events/EventCard";
const EventsPage = () => {
  return (
    <div>
      <Headers activeHeading={4} />
      <div className="mt-[1%]">
        <EventCard active={true} />
      </div>
    </div>
  );
};

export default EventsPage;
