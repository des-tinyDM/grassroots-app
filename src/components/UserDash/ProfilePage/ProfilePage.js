import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import DashHeader from "../DashHeader";
import "./ProfilePage.css";
import {
  updateFirstName,
  updateLastName,
  updateAddress,
  updateCity,
  updateStateName,
  updateZip,
  updateEmail,
  updatePhone,
  submitUpdate
} from "../../../ducks/userReducer";

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = { isEditing: false };
    this.updateProfile = this.updateProfile.bind(this);
    this.editingSwitch = this.editingSwitch.bind(this);
  }
  updateProfile(e) {
    e.preventDefault();
    let user_id = this.props.user.user_id;
    this.props.submitUpdate(
      this.props.first_name || this.props.user.first_name,
      this.props.last_name || this.props.user.last_name,
      this.props.address || this.props.user.address,
      this.props.city || this.props.user.city,
      this.props.stateName || this.props.user.stateName,
      this.props.zip || this.props.user.zip,
      this.props.email || this.props.user.email,
      this.props.phone || this.props.user.phone,
      user_id
    );
    this.setState({ isEditing: false });
    this.props.getUser();
  }

  editingSwitch() {
    this.state.isEditing
      ? this.setState({ isEditing: false })
      : this.setState({ isEditing: true });
  }
  render() {
    return (
      <div className="profile">
        <h1>
          {this.props.user.first_name} {this.props.user.last_name}
          <button onClick={this.editingSwitch}>EDIT</button>
        </h1>
        <form className="profile-body" onSubmit={this.updateProfile}>
          <img
            className="profile-img"
            src={this.props.user.profile_img}
            alt="A photograph of the user."
          />

          <p>Name:</p>
          <div className="info-field">
            <p>First Name:</p>
            {!this.props.user.first_name || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateFirstName(e.target.value)}
                className="info"
                placeholder={this.props.user.first_name}
              />
            ) : (
              this.props.user.first_name
            )}
          </div>
          <div className="info-field">
            <p>Last Name:</p>
            {!this.props.user.last_name || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateLastName(e.target.value)}
                className="info"
                placeholder={this.props.user.last_name}
              />
            ) : (
              this.props.user.last_name
            )}
          </div>

          <p>Address:</p>
          <div className="info-field">
            <p>Address:</p>
            {!this.props.user.address || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateAddress(e.target.value)}
                className="info"
                placeholder={this.props.user.address}
              />
            ) : (
              this.props.user.address
            )}
          </div>
          <div className="info-field">
            <p>City:</p>
            {!this.props.user.city || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateCity(e.target.value)}
                className="info"
                placeholder={this.props.user.city}
              />
            ) : (
              this.props.user.city
            )}
          </div>
          <div className="info-field">
            <p>State:</p>
            {!this.props.user.state || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateStateName(e.target.value)}
                className="info"
                placeholder={this.props.user.state}
              />
            ) : (
              this.props.user.state
            )}
          </div>
          <div className="info-field">
            <p>Zip:</p>
            {!this.props.user.zip || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateZip(e.target.value)}
                className="info"
                placeholder={this.props.user.zip}
              />
            ) : (
              this.props.user.zip
            )}{" "}
          </div>

          <p>Contact</p>
          <div className="info-field">
            <p>Phone:</p>
            {!this.props.user.phone || this.state.isEditing ? (
              <input
                onChange={e => this.props.updatePhone(e.target.value)}
                className="info"
                placeholder={this.props.user.phone}
              />
            ) : (
              this.props.user.phone
            )}{" "}
          </div>
          <div className="info-field">
            <p>Email:</p>
            {!this.props.user.email || this.state.isEditing ? (
              <input
                onChange={e => this.props.updateEmail(e.target.value)}
                className="info"
                placeholder={this.props.user.email}
              />
            ) : (
              this.props.user.email
            )}
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    first_name: state.userReducer.first_name,
    last_name: state.userReducer.last_name,
    address: state.userReducer.address,
    city: state.userReducer.city,
    stateName: state.userReducer.stateName,
    zip: state.userReducer.zip,
    email: state.userReducer.email,
    phone: state.userReducer.phone
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateFirstName,
  updateLastName,
  updateAddress,
  updateCity,
  updateStateName,
  updateZip,
  updateEmail,
  updatePhone,
  submitUpdate
})(ProfilePage);
