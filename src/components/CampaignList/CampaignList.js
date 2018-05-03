import React, { Component } from "react";

import { connect } from "react-redux";
import { getCampaigns } from "../../ducks/campaignReducer";

import CampaignCard from "./CampaignCard/CampaignCard";

import "./CampaignList.css";

class CampaignList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCampaigns();
  }

  render() {
    let campaigns = this.props.campaigns;
    console.log(`campaigns`, campaigns);

    return (
      <div className="Campaign-dash">
        <div>
          <h1>Active Campaigns</h1>
          <div className="campaign-form-container" />
        </div>
        <div>
          {campaigns &&
            campaigns.map((campaign, index) => {
              return (
                <div key={index}>
                  <CampaignCard
                    user_id={this.props.user_id}
                    campaign_id={campaign.campaign_id}
                    name={campaign.name}
                    orglogo={campaign.orglogo}
                    organization={campaign.organization}
                    type={campaign.type}
                    description={campaign.description}
                  />
                </div>
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
    ...state.userReducer
  };
};

export default connect(mapStateToProps, { getCampaigns })(CampaignList);
