import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./Calendar.css";

BigCalendar.momentLocalizer(moment);

const MyCalendar = props => (
  <div className="event-calendar-view">
    {console.log(props.events)}

    {console.log(new Date(2018, 4, 3))}
    <BigCalendar
      events={props.events}
      startAccessor={props.events.start}
      endAccessor={props.events.end}
      selectable
      defaultView="week"
    />
  </div>
);

export default MyCalendar;
