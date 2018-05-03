import axios from "axios";

const GET_USER = "GET_USER";
const UPDATE_FIRST = "UPDATE_FIRST";
const UPDATE_LAST = "UPDATE_LAST";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const UPDATE_CITY = "UPDATE_CITY";
const UPDATE_STATE = "UPDATE_STATE";
const UPDATE_ZIP = "UPDATE_ZIP";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PHONE = "UPDATE_PHONE";
const SUBMIT_USER_UPDATE = "SUBMIT_USER_UPDATE";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}
export function updateFirstName(first_name) {
  return {
    type: UPDATE_FIRST,
    payload: first_name
  };
}
export function updateLastName(last_name) {
  return {
    type: UPDATE_LAST,
    payload: last_name
  };
}
export function updateAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    payload: address
  };
}
export function updateCity(city) {
  return {
    type: UPDATE_CITY,
    payload: city
  };
}
export function updateStateName(stateName) {
  return {
    type: UPDATE_STATE,
    payload: stateName
  };
}
export function updateZip(zip) {
  return {
    type: UPDATE_ZIP,
    payload: zip
  };
}
export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
}
export function updatePhone(phone) {
  return {
    type: UPDATE_PHONE,
    payload: phone
  };
}
export function submitUpdate(
  first_name,
  last_name,
  address,
  city,
  stateName,
  zip,
  email,
  phone,
  user_id
) {
  return {
    type: SUBMIT_USER_UPDATE,
    payload: axios.put(`/api/volunteer/${user_id}`, {
      first_name,
      last_name,
      address,
      city,
      stateName,
      zip,
      email,
      phone
    })
  };
}
const initialState = {
  user: {},
  error: "",
  first_name: "",
  last_name: "",
  address: "",
  city: "",
  stateName: "",
  zip: null,
  email: "",
  phone: ""
};

export default function userReducer(state = initialState, action) {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
    case `${SUBMIT_USER_UPDATE}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
    case `${SUBMIT_USER_UPDATE}_REJECTED`:
      return {
        ...state,
        error: "ERROR"
      };
    case UPDATE_FIRST:
      return {
        ...state,
        first_name: action.payload
      };
    case UPDATE_LAST:
      return {
        ...state,
        last_name: action.payload
      };
    case UPDATE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case UPDATE_ADDRESS:
      console.log(action.payload);

      return {
        ...state,
        address: action.payload
      };
    case UPDATE_STATE:
      return {
        ...state,
        stateName: action.payload
      };
    case UPDATE_ZIP:
      return {
        ...state,
        zip: action.payload
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case UPDATE_PHONE:
      return {
        ...state,
        phone: action.payload
      };
    default:
      return state;
  }
}
