import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../Events.css";
import moment from "moment";
import { getVolunteers } from "../../../../ducks/campaignReducer";
import ScheduledVolunteers from "./Volunteers";

class FullEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchProp: "", searchStr: "" };
    this.handleSearchString = this.handleSearchString.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
  }

  componentDidMount() {
    let index = this.props.events.findIndex(
      event => event.event_id == parseInt(this.props.match.params.event_id)
    );
    let event_id = this.props.events[index].event_id;

    console.log(event_id);
    this.props.getVolunteers(event_id);
  }
  handleSearchString(input) {
    this.setState({ searchStr: input });
  }
  handleSearchType(input) {
    this.setState({ searchProp: input });
  }
  render() {
    let index = this.props.events.findIndex(
      event => event.event_id == this.props.match.params.event_id
    );
    let event = this.props.events[index];

    let sday = moment(event.date_start).format("MMM Do, YYYY");
    let stime = moment(event.time_start, "HH:mm:ss").format("LT");
    let eday = moment(event.date_end).format("MMM Do, YYYY");
    let etime = moment(event.time_end, "HH:mm:ss").format("LT");

    let searchProp = this.state.searchProp;
    let searchStr = this.state.searchStr;

    return (
      <div className="full-event">
        <button onClick={() => console.log(this.props)}>PROPS, MAN!</button>
        <h1>Event Info:</h1>
        <p>{event.event_name} </p>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p>{event.address}</p>
        <p>{event.city}</p>
        <p>{event.state}</p>
        <p>{event.zip}</p>
        <p>
          {sday} {stime}-{etime}
        </p>
        <div>
          <h2>Scheduled Volunteers:</h2>

          <select onChange={e => this.handleSearchType(e.target.value)}>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="zip">Zip Code</option>
          </select>
          <input
            placeholder="Search Volunteers"
            value={this.state.searchStr}
            onChange={e => this.handleSearchString(e.target.value)}
          />
          <button type="submit" value="Search" />

          {!searchStr
            ? this.props.volsScheduled.map((e, i) => {
                return (
                  <ScheduledVolunteers
                    key={i}
                    fname={e.first_name}
                    lname={e.last_name}
                    phone={e.phone}
                    email={e.email}
                  />
                );
              })
            : this.props.volsScheduled
                .filter((e, i) => {
                  return e.first_name.includes(this.state.searchStr);
                })
                .map((e, i) => {
                  return (
                    <ScheduledVolunteers
                      key={i}
                      fname={e.first_name}
                      lname={e.last_name}
                      phone={e.phone}
                      email={e.email}
                    />
                  );
                })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.campaignReducer,
    volsScheduled: state.campaignReducer.volsScheduled
  };
};

export default withRouter(
  connect(mapStateToProps, { getVolunteers })(FullEventPage)
);
