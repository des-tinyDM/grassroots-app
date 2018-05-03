import React, { Component } from "react";
import CampaignLogo from "../CampaignLogo";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(`footer`, this.props);
    let { campaigns } = this.props;

    let display = campaigns.map((e, i) => {
      return <CampaignLogo logo={e.orglogo} />;
    });
    return (
      <div className="footer-container">
        <h2 className="footer-text">Trusted by these campaigns:</h2>
        <div id="logo-display">{display}</div>
      </div>
    );
  }
}

export default Footer;
