import React from "react";
import "./Events.css";

const ScheduledEvents = props => {
  return (
    <div className="scheduled-events-card">
      <p>{props.name}</p>
      <p>{props.date}</p>
    </div>
  );
};

export default ScheduledEvents;
