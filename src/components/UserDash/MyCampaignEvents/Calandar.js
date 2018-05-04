import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./Calendar.css";
import SweetAlert from "sweetalert2-react";
import { withSwalInstance } from "sweetalert2-react";

BigCalendar.momentLocalizer(moment);

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  handleEventClick() {}

  render() {
    return (
      <div className="event-calendar-view">
        {console.log(this.props)}

        <BigCalendar
          events={this.props.events}
          startAccessor={this.props.events.start}
          endAccessor={this.props.events.end}
          selectable
          onSelectEvent={e => this.handleEventClick}
          defaultView="month"
        />
        <SweetAlert show={this.state.show} title={this.props.events.title} />
        <div> This is an event description.</div>
      </div>
    );
  }
}

export default MyCalendar;
