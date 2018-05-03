import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Events.css";

class EventsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Link to={`/campaigns/events/${this.props.event_id}`}>
        <div className="event">
          <h2>{this.props.eventName}</h2>
          <p>
            {this.props.eventStart} {this.props.startTime}-{this.props.endTime}
          </p>
          <p>{this.props.desc}</p>
          <p />

          <div>
            <p>{this.props.location}</p>
            <p>{this.props.address}</p>
            <p>{this.props.city}</p>
            <p>{this.props.state}</p>
            <p>{this.props.zip}</p>
          </div>
          <div />
          <button
            onClick={e => {
              this.props.schedule(
                this.props.campaign_id,
                this.props.event_id,
                this.props.user_id
              );
            }}
          >
            Sign Up To Volunteer
          </button>
        </div>
      </Link>
    );
  }
}

export default EventsCard;
