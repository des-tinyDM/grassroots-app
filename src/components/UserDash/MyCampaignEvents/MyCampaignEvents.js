import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getEvents, scheduleUserAsVol } from "../../../ducks/campaignReducer";
import EventsCard from "./EventsCard";
import moment from "moment";
import ScheduledEvents from "./ScheduledEventCard";
import MyCalendar from "./Calandar";
import EventCreator from "./EventCreator";
import { withRouter } from "react-router-dom";
import "./MyCampaignEvents.css";

class MyCampaignEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      eventName: "",
      eventType: "",
      eventDate: "",
      eventTimeStart: "",
      eventTimeEnd: "",
      eventLocation: "",
      eventAddress: "",
      eventCity: "",
      eventState: "",
      eventZip: null,
      showCalendar: false
    };
    this.handleEventName = this.handleEventName.bind(this);
    this.handleEventType = this.handleEventType.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
    this.handleEventTimeStart = this.handleEventTimeStart.bind(this);
    this.handleEventTimeEnd = this.handleEventTimeEnd.bind(this);
    this.handleEventLocation = this.handleEventLocation.bind(this);
    this.handleEventAddress = this.handleEventAddress.bind(this);
    this.handleEventCity = this.handleEventCity.bind(this);
    this.handleEventState = this.handleEventState.bind(this);
    this.handleEventZip = this.handleEventZip.bind(this);
  }

  handleCreate(e) {
    this.setState({ isCreating: !this.state.isCreating });
    console.log(this.state.isCreating);
  }
  handleEventName(e) {
    this.setState({ eventName: e.target.value });
    console.log(e.target.value);
  }
  handleEventType(e) {
    this.setState({ eventType: e.target.value });
    console.log(e.target.value);
  }
  handleEventDate(date) {
    this.setState({ eventDate: date });
    console.log(date);
  }
  handleEventTimeStart(e) {
    this.setState({ eventTimeStart: e.target.value });
    console.log(e.target.value);
  }
  handleEventTimeEnd(e) {
    this.setState({ eventTimeEnd: e.target.value });
    console.log(e.target.value);
  }
  handleEventLocation(e) {
    this.setState({ eventLocation: e.target.value });
    console.log(e.target.value);
  }
  handleEventAddress(e) {
    this.setState({ eventAddress: e.target.value });
    console.log(e.target.value);
  }
  handleEventCity(e) {
    this.setState({ eventCity: e.target.value });
    console.log(e.target.value);
  }
  handleEventState(e) {
    this.setState({ eventState: e.target.value });
    console.log(e.target.value);
  }
  handleEventZip(e) {
    this.setState({ eventZip: e.target.value });
    console.log(e.target.value);
  }

  componentDidMount() {
    this.props.joined[0]
      ? this.props.getEvents(this.props.joined[0].campaign_id)
      : null;
  }
  render() {
    let eventsMapped = this.props.events.map((e, i) => {
      moment.locale();
      let sday = moment(e.start, "YYYY-MM-DD HH:mm:ss").format("LLL");
      let stime = moment(e.start, "YYYY-MM-DD HH:mm:ss").format("h:mm:ss a");
      let eday = moment(e.end, "YYYY-MM-DD HH:mm:ss").format("MMM Do, YYYY");
      let etime = moment(e.end, "YYYY-MM-DD HH:mm:ss").format("h:mm:ss a");
      return (
        <EventsCard
          key={i}
          event_id={e.event_id}
          eventName={e.event_name}
          eventStart={sday}
          startTime={stime}
          eventEnd={eday}
          endTime={etime}
          desc={e.description}
          location={e.location}
          address={e.address}
          city={e.city}
          stateName={e.state}
          zip={e.zip}
          campaign_id={this.props.joined[0].campaign_id}
          user_id={this.props.user.user_id}
          schedule={this.props.scheduleUserAsVol}
        />
      );
    });

    let calendarTimeObj = this.props.events.map((e, i) => {
      let startDT = new Date(`${e.start}`);
      let endDT = new Date(`${e.end}`);
      e.start = startDT;
      e.end = endDT;

      console.log(`START`, startDT);

      // console.log(`new Date(${forCalendar})`);
      console.log(e);
    });

    console.log(`this is important`, this.props.events);

    return (
      <div className="campaign-events">
        <div className="create-event-btn">
          {this.props.joined[0] &&
            this.props.joined[0].role === "Admin" && (
              <button onClick={e => this.handleCreate(e)}>Add an Event</button>
            )}
        </div>
        {this.state.isCreating ? (
          <div>
            <EventCreator campaign_id={this.props.joined[0].campaign_id} />
          </div>
        ) : null}
        <h2>Your Scheduled Events</h2>
        {this.props.scheduled[0] ? (
          this.props.scheduled.map((e, i) => {
            return (
              <div>
                <ScheduledEvents key={i} name={e.event_name} date={e.start} />
              </div>
            );
          })
        ) : (
          <h4>You have no events scheduled!</h4>
        )}

        {!this.props.events.length ? (
          <h1>No Events Scheduled at this time.</h1>
        ) : (
          <div className="grid-container">
            <h1>Events:</h1>
            <div className="grid-item">{eventsMapped}</div>
          </div>
        )}

        <div className="MyCalendar">
          <MyCalendar events={this.props.events} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.campaignReducer,
    scheduled: state.campaignReducer.scheduled
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getEvents,
    scheduleUserAsVol
  })(MyCampaignEvents)
);
