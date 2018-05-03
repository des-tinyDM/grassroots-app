import React from "react";

import { Link } from "react-router-dom";
import "./MyCampaignCard.css";

const MyCampaignCard = (props, match) => {
  console.log(props);
  return (
    <div>
      <div className="my-campaign-card">
        <h1>{props.role}</h1>
        <img src={props.orglogo} />
        <h1>{props.name}</h1>
        <p>{props.organization}</p>
        <p>{props.desc}</p>
        <div className="camp-data-minimal">
          <p>VR:</p>
          <p>Total Commits:</p>
          <p>Phone Calls:</p>
          <p>Contacts:</p>
        </div>
      </div>
    </div>
  );
};

export default MyCampaignCard;
