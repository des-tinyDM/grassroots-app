import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../../../ducks/campaignReducer";

class EventCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      location: "",
      address: "",
      city: "",
      stateName: "",
      zip: null,
      start: null,
      end: null
    };
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(input) {
    this.setState({ name: input });
    console.log(input);
  }

  handleDescription(input) {
    this.setState({ desc: input });
    console.log(input);
  }

  handleLocation(input) {
    this.setState({ location: input });
  }
  handleAddress(input) {
    this.setState({ address: input });
  }
  handleCity(input) {
    this.setState({ city: input });
  }
  handleState(input) {
    this.setState({ stateName: input });
  }
  handleZip(input) {
    this.setState({ zip: input });
  }
  handleStart(input) {
    this.setState({ start: input });
  }
  handleEnd(input) {
    this.setState({ end: input });
  }
  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    this.props.createEvent(
      this.props.campaign_id,
      this.state.name,
      this.state.desc,
      this.state.location,
      this.state.address,
      this.state.city,
      this.state.stateName,
      this.state.zip,
      this.state.start,
      this.state.end
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Event Name"
          type=""
          onChange={e => this.handleName(e.target.value)}
        />
        <input
          placeholder="Event Description"
          type="textarea"
          onChange={e => this.handleDescription(e.target.value)}
        />
        <input
          placeholder="Event Location"
          type=""
          onChange={e => this.handleLocation(e.target.value)}
        />
        <input
          placeholder="Address"
          type=""
          onChange={e => this.handleAddress(e.target.value)}
        />
        <input
          placeholder="City"
          type=""
          onChange={e => this.handleCity(e.target.value)}
        />
        <input
          placeholder="State"
          type=""
          onChange={e => this.handleState(e.target.value)}
        />
        <input
          placeholder="Zipcode"
          type=""
          onChange={e => this.handleZip(e.target.value)}
        />
        <input
          placeholder="Event Start"
          type="datetime-local"
          step={60 * 30}
          onChange={e => this.handleStart(e.target.value)}
        />
        <input
          placeholder="Event End"
          type="datetime-local"
          step={60 * 30}
          onChange={e => this.handleEnd(e.target.value)}
        />
        <input type="submit" value="Save Event" />
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.campaignReducer
  };
};

export default connect(mapStateToProps, { createEvent })(EventCreator);
