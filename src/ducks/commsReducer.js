import axios from "axios";

const initialState = {
  contacts: [],
  isSubmitting: false,
  commsList: []
};

const SUBMIT_NEW_CONTACT = "SUBMIT_NEW_CONTACT";
const GET_COMMS_DATA = "GET_COMMS_DATA";

export function submitNewContact(
  firstName,
  lastName,
  address,
  city,
  stateName,
  zip,
  phone,
  email,
  DOB
) {
  return {
    type: SUBMIT_NEW_CONTACT,
    payload: axios
      .post(`/api/campaign/submit_contact/`, {
        firstName,
        lastName,
        address,
        city,
        stateName,
        zip,
        phone,
        email,
        DOB
      })
      .then(response => {
        console.log(response);
        console.log(response);
        return response.data;
      })
      .catch(err => console.log(err))
  };
}

export function getCommsData(campaign_id, type) {
  return {
    type: GET_COMMS_DATA,
    payload: axios
      .get(`/api/campaigns/data/${campaign_id}/${type}`)
      .then(response => response.data)
      .catch(err => console.log(err))
  };
}

export default function commsReducer(state = initialState, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case `${SUBMIT_NEW_CONTACT}_PENDING`:
      return {
        ...state,
        isSubmitting: true
      };
    case `${SUBMIT_NEW_CONTACT}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        contacts: action.payload.data
      };
    case `${GET_COMMS_DATA}_FULFILLED`:
      return {
        ...state,
        commsList: action.payload
      };
    default:
      return state;
  }
}
