import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./headerlogo.png";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserDash from "./components/UserDash/UserDash";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/UserDash/ProfilePage/ProfilePage";
import { getUser } from "./ducks/userReducer";
import { getCampaigns } from "./ducks/campaignReducer";
import Forbidden from "./components/Forbidden";
import CampaignList from "./components/CampaignList/CampaignList";
import MyCampaignInfo from "./components/UserDash/MyCampaignInfo/MyCampaignInfo";
import CampaignLogo from "./components/CampaignLogo";
import DashHeader from "./components/UserDash/DashHeader";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getCampaigns();
    console.log(this.props);
  }

  render() {
    console.log(this.props);

    return (
      <div className="App">
        <DashHeader />
        <div className="app-container">
          <div className="header-container">
            <Header />
          </div>
          <div className="app-content">
            <Switch>
              <Route
                exact
                path="/campaigns"
                render={() =>
                  this.props.user.authid ? (
                    <CampaignList />
                  ) : (
                    <h1>Login to View Campaigns</h1>
                  )
                }
              />
              <Route
                path="/"
                render={() =>
                  this.props.user.authid ? (
                    <UserDash />
                  ) : (
                    <LandingPage campaigns={this.props.campaigns} />
                  )
                }
              />
              
            </Switch>
          </div>
        </div>
        {/* <Footer campaigns={campaigns} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.userReducer,
    ...state.campaignReducer
  };
};
export default withRouter(
  connect(mapStateToProps, { getUser, getCampaigns })(App)
);
