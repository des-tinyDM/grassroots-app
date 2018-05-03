import React from "react";
import { NavLink as Link } from "react-router-dom";
import "./DashHeader.css";

const DashHeader = props => {
  return (
    <nav className="dash-header">
      <Link className="dash-nav-top dash-nav nav-item" to="/">
        <div style={{ fontSize: "1.5em", color: "white" }}>
          <i class="fas fa-home" />
        </div>
        <p className="dash-nav-text"> Dash</p>
      </Link>

      <Link className="dash-nav nav-item" to="/profile">
        <div style={{ fontSize: "1.5em", color: "white" }}>
          <i class="fas fa-user" />
        </div>
        <p className="dash-nav-text">My Profile</p>
      </Link>

      <Link className="dash-nav nav-item" to="/mycampaign/">
        <div style={{ fontSize: "1.5em", color: "white" }}>
          <i class="fab fa-centercode" />
        </div>
        <p className="dash-nav-text">My Campaign</p>
      </Link>

      <Link className="dash-nav nav-item" to="/mycampaign/events">
        <div style={{ fontSize: "1.5em", color: "#white" }}>
          <i class="fas fa-calendar-alt" />
        </div>
        <p className="dash-nav-text">Events</p>
      </Link>
      <Link className="dash-nav nav-item" to="/mycampaign/data">
        <div style={{ fontSize: "1.5em", color: "white" }}>
          <i class="fas fa-chart-pie" />
        </div>
        <p className="dash-nav-text">Data</p>
      </Link>
      <div className="run-over" />
      <div className="sign-out-div">
        <a
          href={process.env.REACT_APP_LOGOUT}
          className="dash-nav nav-item logout-btn"
        >
          <div style={{ fontSize: "1.5em", color: "white" }}>
            <i class="fas fa-sign-out-alt" />
          </div>
          <p className="dash-nav-text" id="logout-btn">
            Logout
          </p>
        </a>
      </div>
    </nav>
  );
};

export default DashHeader;
