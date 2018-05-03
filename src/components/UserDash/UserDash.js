import React, { Component } from "react";
import "./UserDash.css";
import { Link, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../../ducks/userReducer";
import {
  getCampaignsJoined,
  getEvents,
  getScheduledEvents
} from "../../ducks/campaignReducer";
import { getCommsData } from "../../ducks/commsReducer";
import DashHeader from "./DashHeader";
import MyCampaignInfo from "./MyCampaignInfo/MyCampaignInfo";
import Forbidden from "../Forbidden";
import ProfilePage from "./ProfilePage/ProfilePage";
import MyCampaignData from "./MyCampaignData/MyCampaignData";
import MyCampaignEvents from "./MyCampaignEvents/MyCampaignEvents";
import FullEventPage from "./MyCampaignEvents/FullEventPage/FullEventPage";

class UserDash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .getCampaignsJoined(this.props.user.user_id)
      .then(
        this.props.joined[0]
          ? () => this.props.getEvents(this.props.joined[0].campaign_id)
          : null
      )
      .then(() => this.props.getScheduledEvents(this.props.user.user_id))
      .then(
        this.props.joined[0]
          ? () =>
              this.props.getCommsData(this.props.joined[0].campaign_id, "VR")
          : null
      );
  }
  render() {
    return (
      <div className="user-dash">
        <div className="dash-content">CONTENT</div>

        <Switch>
          <Route
            path="/profile"
            render={() =>
              this.props.user.authid ? (
                <ProfilePage user={this.props.user} />
              ) : (
                <h1>You don't have a profile.</h1>
              )
            }
          />
          <Route
            path="/mycampaign/data"
            render={() =>
              this.props.user.authid ? (
                <MyCampaignData
                  user={this.props.user}
                  role={this.props.joined.role}
                />
              ) : (
                <h1>Why haven't you joined a campaign? Log in to volunteer!</h1>
              )
            }
          />
          <Route
            path="/mycampaign/events"
            render={() =>
              this.props.user.authid ? (
                <MyCampaignEvents
                  user={this.props.user}
                  role={this.props.joined.role}
                  joined={this.props.joined}
                  events={this.props.events}
                />
              ) : (
                <h1>Why haven't you joined a campaign? Log in to volunteer!</h1>
              )
            }
          />
          <Route
            exact
            path="/mycampaign"
            render={() =>
              this.props.user.authid ? (
                <MyCampaignInfo
                  user={this.props.user}
                  role={this.props.joined.role}
                />
              ) : (
                <h1>Why haven't you joined a campaign? Log in to volunteer!</h1>
              )
            }
          />
          <Route
            path="/campaigns/events/:event_id"
            render={() =>
              this.props.user.authid ? (
                <FullEventPage
                  user={this.props.user}
                  role={this.props.joined.role}
                  events={this.props.events}
                />
              ) : (
                <h1>Why haven't you joined a campaign? Log in to volunteer!</h1>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.userReducer,
    ...state.campaignReducer,
    joined: state.campaignReducer.joined,
    scheduled: state.campaignReducer.scheduled,
    commsList: state.commsReducer.commsList
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getCampaignsJoined,
    getEvents,
    getScheduledEvents,
    getCommsData
  })(UserDash)
);
