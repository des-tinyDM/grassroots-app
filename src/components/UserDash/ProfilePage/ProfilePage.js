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
    console.log(this.state);
    return (
      <div className="profile">
        <h1 className="profile-user-title">
          {this.props.user.first_name} {this.props.user.last_name}
        </h1>
        {/* <div className="profile-header">
          
        </div> */}

        <div className="profile-body">
          <div className="img-container">
            <img
              className="profile-img"
              src={this.props.user.profile_img}
              alt="A photograph of the user."
            />
            <button className="upload-img-btn">Upload image</button>
          </div>

          <form className="form" onSubmit={this.updateProfile}>
            <input
              type="button"
              value="EDIT"
              className="profile-edit-btn"
              onClick={this.editingSwitch}
            />

            <div className="form-body">
              <div className="form-labels">
                <p>Name</p>
                <p>Last Name</p>
                <p>Address</p>
                <p>City</p>
                <p>State</p>
                <p>Zip</p>
                <p>Phone</p>
                <p>Email</p>
              </div>
              <div className="user-info">
                <div className="info-field">
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

                <div className="info-field">
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
                  {!this.props.user.zip || this.state.isEditing ? (
                    <input
                      onChange={e => this.props.updateZip(e.target.value)}
                      className="info"
                      placeholder={this.props.user.zip}
                    />
                  ) : (
                    this.props.user.zip
                  )}
                </div>
                <div className="info-field">
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
              </div>
            </div>
            <input className="profile-submit-btn" type="submit" />
          </form>
        </div>
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
