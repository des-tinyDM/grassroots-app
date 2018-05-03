import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateCampaignName,
  updateCampaignOrganization,
  updateCampaignDescription,
  updateCampaignScope,
  updateCampaignType,
  updateCampaignLogo,
  getCampaigns,
  submitCampaign
} from "../../../ducks/campaignReducer";
import { getUser } from "../../../ducks/userReducer";
import "./CampaignForm.css";

class CampaignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false
    };

    this.submitHandler = this.submitHandler.bind(this);
  }
  createSwitch() {
    !this.state.isCreating
      ? this.setState({ isCreating: true })
      : this.setState({ isCreating: false });
  }
  submitHandler(e) {
    e.preventDefault();
    this.props.submitCampaign(
      this.props.name,
      this.props.organization,
      this.props.orglogo,
      this.props.type,
      this.props.scope,
      this.props.description,
      this.props.user.user_id
    );
  }
  componentDidMount() {
    getUser();
  }
  render() {
    console.log(this.props);
    let {
      updateCampaignName,
      updateCampaignOrganization,
      updateCampaignDescription,
      updateCampaignScope,
      updateCampaignType,
      updateCampaignLogo,
      submitCampaign,
      updateCampaignInfo,
      getUser
    } = this.props;

    return (
      <form className="campaign-form" onSubmit={e => this.submitHandler(e)}>
        <h1>Create a Campaign</h1>
        <button onClick={this.createSwitch}>Add Campaign</button>
        <p>Campaign Name</p>
        <input
          placeholder="Your Campaign Name here"
          onChange={e => updateCampaignName(e.target.value)}
        />
        <p>Organization</p>
        <input
          type="text"
          onChange={e => updateCampaignOrganization(e.target.value)}
        />
        <p>Organization Logo</p>
        <input onChange={e => updateCampaignLogo(e.target.value)} />
        <p>Type</p>
        <select
          className="scope"
          multiple
          onChange={e => updateCampaignType(e.target.value)}
        >
          <option value="Single-Issue">Single-Issue</option>
          <option value="Candidate">Candidate</option>
          <option value="Community Organizing">Community Organizing</option>
          <option value="Ballot">Ballot</option>
          <option value="Referendem">Referendem</option>
        </select>
        <p>Scope</p>
        <select
          className="scope"
          onChange={e => updateCampaignScope(e.target.value)}
        >
          <option value="National">National</option>
          <option value="Statewide">Statewide</option>
          <option value="Local">Local</option>
        </select>
        <p>Description</p>
        <textarea
          className="description"
          onChange={e => updateCampaignDescription(e.target.value)}
        />
        <input type="submit" value="Start Your Campaign" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.userReducer,
    organization: state.campaignReducer.organization,
    name: state.campaignReducer.name,
    type: state.campaignReducer.type,
    description: state.campaignReducer.description,
    orglogo: state.campaignReducer.orglogo,
    scope: state.campaignReducer.scope,
    active: state.campaignReducer.active
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateCampaignName,
  updateCampaignOrganization,
  updateCampaignLogo,
  updateCampaignDescription,
  updateCampaignScope,
  updateCampaignType,
  getCampaigns,
  submitCampaign
  // updateCampaignInfo
})(CampaignForm);
