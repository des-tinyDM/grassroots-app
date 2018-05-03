import React from "react";
import "./Volunteers.css";

const ScheduledVolunteers = props => {
  return (
    <div className="vol-info-redux">
      <h3>
        Name: {props.fname} {props.lname}
      </h3>

      <p>Cell: {props.phone}</p>
      <p>Email: {props.email}</p>
      <p>Total VR:</p>
    </div>
  );
};

export default ScheduledVolunteers;
