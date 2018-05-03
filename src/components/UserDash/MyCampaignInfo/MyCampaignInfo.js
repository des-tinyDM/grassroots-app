import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getCampaigns,
  getCampaignsJoined,
  getUserRole
} from "../../../ducks/campaignReducer";
import { getUser } from "../../../ducks/userReducer";
import MyCampaignCard from "./MyCampaignCard";

import "./MyCampaignCard.css";
import CampaignList from "../../CampaignList/CampaignList";

class MyCampaignInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getCampaignsJoined(this.props.user.user_id).then(() => {
      this.props.getCampaigns();
    });
  }
  render() {
    // console.log(this.props.joined[0].role);

    let { joined } = this.props;
    return (
      <div>
        {!joined[0] && <CampaignList user_id={this.props.user.user_id} />}
        {joined[0] &&
          joined.map((e, i) => {
            return (
              <MyCampaignCard
                key={i}
                name={e.name}
                organization={e.organization}
                orglogo={e.orglogo}
                desc={e.description}
                type={e.type}
                scope={e.scope}
                campaign_id={e.campaign_id}
                role={this.props.joined[i].role}
              />
            );
          })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    joined: state.campaignReducer.joined,
    role: state.campaignReducer.role
  };
};

export default connect(mapStateToProps, {
  getCampaigns,
  getCampaignsJoined,
  getUser,
  getUserRole
})(MyCampaignInfo);
