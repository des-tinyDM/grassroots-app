import React from "react";
import "./MyCampaignData.css";

import { connect } from "react-redux";
import { submitNewContact, getCommsData } from "../../../ducks/commsReducer";
import FauxChart from "./VRPieChart";
import "./piestyle.css";

// import VRcommsList from "./data";

// var data = VRcommsList.data;

class MyCampaignData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      DOB: "",
      data: [],
      dataIndex: 0
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.changeData = this.changeData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFirst(input) {
    this.setState({ firstName: input });
  }
  handleLast(input) {
    this.setState({ lastName: input });
  }
  handleAddress(input) {
    this.setState({ address: input });
  }
  handleCity(input) {
    this.setState({ city: input });
  }
  handleState(input) {
    this.setState({ state: input });
  }
  handleZip(input) {
    this.setState({ zip: input });
  }
  handlePhone(input) {
    this.setState({ phone: input });
  }
  handleEmail(input) {
    this.setState({ email: input });
  }
  handleDOB(input) {
    this.setState({ DOB: input });
    console.log(input);
  }

  handleSubmit(e) {
    let {
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      email,
      DOB
    } = this.state;

    let submitContactBody = {
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      email,
      DOB
    };

    e.preventDefault();
    this.props.submitNewContact(submitContactBody);
  }

  changeData() {
    this.setState(state => ({
      dataIndex: (state.dataIndex + 1) % 2
    }));
  }

  componentDidMount() {
    this.props.joined[0]
      ? this.props.getCommsData(this.props.joined[0].campaign_id, "VR")
      : null;
    // console.log(this.props.joined)
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    let VRcommsList = this.props.commsList;

    const sortedObj = VRcommsList.reduce((acc, cur) => {
      if (acc[cur.event_id]) {
        acc[cur.event_id].push(cur);
        return acc;
      }
      acc[cur.event_id] = [cur];
      return acc;
    }, {});

    const sortedList = Object.keys(sortedObj).map(key => {
      return sortedObj[key];
    });

    console.log(sortedList);

    let { user_id } = this.props;
    let {
      firstName,
      lastName,
      address,
      city,
      stateName,
      zip,
      phone,
      email,
      DOB
    } = this.state;

    let submitContactBody = {
      user_id,
      firstName,
      lastName,
      address,
      city,
      stateName,
      zip,
      phone,
      email,
      DOB
    };

    return (
      <div className="campaign-data-container">
        <div>
          <h3>Stats:</h3>
          <p>VR:</p>
          <p>Commits:</p>
          <p>Calls Made:</p>
        </div>

        <h4>Submit Contact Data:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="First Name"
            onChange={e => this.handleFirst(e.target.value)}
          />
          <input
            placeholder="Last Name"
            onChange={e => this.handleLast(e.target.value)}
          />
          <input
            placeholder="Address"
            onChange={e => this.handleAddress(e.target.value)}
          />
          <input
            placeholder="City"
            onChange={e => this.handleCity(e.target.value)}
          />
          <input
            placeholder="State"
            onChange={e => this.handleState(e.target.value)}
          />
          <input
            placeholder="Zip"
            onChange={e => this.handleZip(e.target.value)}
          />
          <input
            placeholder="Phone"
            onChange={e => this.handlePhone(e.target.value)}
          />
          <input
            placeholder="Email"
            onChange={e => this.handleEmail(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date Of Birth"
            onChange={e => this.handleDOB(e.target.value)}
          />
          <input type="submit" value="Submit Contact" />
        </form>

        <div>
          <button onClick={this.changeData}>Change data</button>
          <input
            type="range"
            min="0"
            max={sortedList.length}
            step={1}
            value={this.state.value}
            onChange={e => this.changeData(e.target.value)}
          />
          <div className="d3-container">
            {this.props.commsList[0] ? (
              <FauxChart
                dataIndex={Number(this.state.dataIndex)}
                title="Voter Reg by Volunteer"
                data={VRcommsList}
              />
            ) : null}
          </div>
        </div>

        <div className="campaign-contacts-container"> Campaign Contacts:</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.userReducer,
    ...state.commsReducer,
    joined: state.campaignReducer.joined,
    scheduled: state.campaignReducer.scheduled,
    commsList: state.commsReducer.commsList
  };
};

export default connect(mapStateToProps, { submitNewContact, getCommsData })(
  MyCampaignData
);
