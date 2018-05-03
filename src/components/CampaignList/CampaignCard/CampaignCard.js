import React from "react";
import "./CampaignCard.css";
import { connect } from "react-redux";
import { userJoinsCampaign } from "../../../ducks/campaignReducer";

const CampaignCard = props => {
  console.log(props);
  return (
    <div className="campaign-card">
      <h1>{props.name}</h1>
      <img className="orglogo" src={props.orglogo} alt="Campaign's emblem." />
      <h2>{props.organization}</h2>
      <h3>{props.type}</h3>
      <p>{props.description}</p>
      <button
        onClick={() =>
          props.userJoinsCampaign(props.campaign_id, props.user_id, "volunteer")
        }
        className="join-campaign"
      >
        JOIN THIS CAMPAIGN
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  userId: state.userReducer.user.id;
};

export default connect(mapStateToProps, { userJoinsCampaign })(CampaignCard);
