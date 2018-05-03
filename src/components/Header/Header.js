import React from "react";
import { connect } from "react-redux";
import "./Header.css";
import logo from "../../headerlogo.png";

const Header = props => {
  return (
    <div>
      <header className="website-header">
        <img src={logo} className="headerLogo" />
        <div className="navs">
          <div>About</div>
          <div>Contact</div>
          <div>OtherThing</div>
        </div>
      </header>
    </div>
  );
};

export default Header;
