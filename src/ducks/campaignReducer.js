import axios from "axios";

const GET_CAMPAIGNS = "GET_CAMPAIGNS";
const GET_JOINED = "GET_JOINED";
const GET_USER_ROLE = "GET_USER_ROLE";
const GET_EVENTS = "GET_EVENTS";
const UPDATE_CAMPAIGN_NAME = "UPDATE_CAMPAIGN_NAME";
const UPDATE_CAMPAIGN_ORGANIZATION = "UPDATE_CAMPAIGN_ORGANIZATION";
const UPDATE_CAMPAIGN_TYPE = "UPDATE_CAMPAIGN_TYPE";
const UPDATE_CAMPAIGN_SCOPE = "UPDATE_CAMPAIGN_SCOPE";
const UPDATE_CAMPAIGN_DESCRIPTION = "UPDATE_CAMPAIGN_DESCRIPTION";
const UPDATE_CAMPAIGN_ORGLOGO = "UPDATE_CAMPAIGN_ORGLOGO";
const SUBMIT_CAMPAIGN = "SUBMIT_CAMPAIGN";
const UPDATE_CAMPAIGN_INFO = "UPDATE_CAMPAIGN_INFO";
const USER_JOINS_CAMPAIGN = "USER_JOINS_CAMPAIGN";
const SCHEDULE_USER_AS_VOL = "SCHEDULE_USER_AS_VOL";
const GET_SCHEDULED = "GET_SCHEDULED";
const GET_VOLS_SCHEDULED = "GET_VOLS_SCHEDULED";
const CREATE_EVENT = "CREATE_EVENT";

const initialState = {
  campaigns: [],
  joined: [],
  isLoading: false,
  name: "",
  organization: "",
  orglogo: "",
  description: "",
  scope: "",
  role: "",
  events: [],
  scheduled: [],
  volsScheduled: []
};

export function getCampaigns() {
  return {
    type: GET_CAMPAIGNS,
    payload: axios
      .get(`/api/campaigns`)
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(err => err)
  };
}

export function userJoinsCampaign(campaign_id, user_id, role) {
  return {
    type: USER_JOINS_CAMPAIGN,
    payload: axios
      .post(`/api/campaigns/join/${campaign_id}`, { user_id, role })
      .catch(response => response).data
  };
}

export function getCampaignsJoined(user_id) {
  return {
    type: GET_JOINED,
    payload: axios
      .get(`/api/campaigns/joined/${user_id}`)
      .then(response => response.data)
      .catch(err => err)
  };
}

export function getScheduledEvents(user_id) {
  return {
    type: GET_SCHEDULED,
    payload: axios
      .get(`/api/camapaigns/events/${user_id}`)
      .then(response => response.data)
      .catch(err => err)
  };
}

export function getUserRole(campaign_id, user_id) {
  return {
    type: GET_USER_ROLE,
    payload: axios
      .get(`/api/campaigns/${campaign_id}/${user_id}`)
      .then(response => {
        console.log(response), response.data;
      })
      .catch(err => console.log(err))
  };
}
export function getEvents(campaign_id) {
  return {
    type: GET_EVENTS,
    payload: axios
      .get(`/api/campaigns/${campaign_id}`)
      .then(response => response.data)
      .catch(err => err)
  };
}

export function getVolunteers(event_id) {
  return {
    type: GET_VOLS_SCHEDULED,
    payload: axios
      .get(`/api/events/volunteers/${event_id}`)
      .then(response => response.data)
      .catch(err => console.log(err))
  };
}

export function scheduleUserAsVol(campaign_id, event_id, user_id) {
  return {
    type: SCHEDULE_USER_AS_VOL,
    payload: axios
      .post(`/api/campaigns/events`, {
        campaign_id,
        event_id,
        user_id
      })
      .then(response => response.data)
      .catch(err => err)
  };
}
export function submitCampaign(
  name,
  organization,
  orglogo,
  type,
  scope,
  description,
  user_id
) {
  return {
    type: SUBMIT_CAMPAIGN,
    payload: axios.post(`/api/campaign`, {
      name,
      organization,
      orglogo,
      type,
      scope,
      description,
      user_id
    })
  };
}
export function createEvent(
  campaign_id,
  name,
  desc,
  location,
  address,
  city,
  stateName,
  zip,
  start,
  end
) {
  return {
    type: CREATE_EVENT,
    payloaad: axios
      .post(`/api/${campaign_id}/events`, {
        name,
        desc,
        location,
        address,
        city,
        stateName,
        zip,
        start,
        end
      })
      .then(response => response.data)
  };
}

export function updateCampaignInfo(
  name,
  organization,
  orglogo,
  type,
  scope,
  description
) {
  return {
    type: UPDATE_CAMPAIGN_INFO,
    payload: axios.post(`/api/campaign/:id`, {
      name,
      organization,
      orglogo,
      type,
      scope,
      description
    })
  };
}

export function updateCampaignName(name) {
  return {
    type: UPDATE_CAMPAIGN_NAME,
    payload: name
  };
}
export function updateCampaignOrganization(organization) {
  return {
    type: UPDATE_CAMPAIGN_ORGANIZATION,
    payload: organization
  };
}
export function updateCampaignType(type) {
  return {
    type: UPDATE_CAMPAIGN_TYPE,
    payload: type
  };
}
export function updateCampaignDescription(description) {
  return {
    type: UPDATE_CAMPAIGN_DESCRIPTION,
    payload: description
  };
}
export function updateCampaignScope(scope) {
  return {
    type: UPDATE_CAMPAIGN_SCOPE,
    payload: scope
  };
}
export function updateCampaignLogo(orglogo) {
  return {
    type: UPDATE_CAMPAIGN_ORGLOGO,
    payload: orglogo
  };
}

export default function campaignReducer(state = initialState, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case `${GET_CAMPAIGNS}_PENDING`:
    case `${GET_JOINED}_PENDING`:
    case `${GET_EVENTS}_PENDING`:
    case `${GET_VOLS_SCHEDULED}_PENDING`:
    case `${GET_SCHEDULED}_PENDING`:
      return Object.assign({}, state, { isLoading: true });
    case `${GET_CAMPAIGNS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        campaigns: action.payload
      });

    case `${GET_EVENTS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        events: action.payload
      });
    case UPDATE_CAMPAIGN_NAME:
      return Object.assign({}, state, { name: action.payload });

    case UPDATE_CAMPAIGN_DESCRIPTION:
      return Object.assign({}, state, { description: action.payload });

    case UPDATE_CAMPAIGN_ORGANIZATION:
      return Object.assign({}, state, { organization: action.payload });

    case UPDATE_CAMPAIGN_SCOPE:
      return Object.assign({}, state, { scope: action.payload });

    case UPDATE_CAMPAIGN_TYPE:
      return Object.assign({}, state, { type: action.payload });

    case UPDATE_CAMPAIGN_ORGLOGO:
      return Object.assign({}, state, { orglogo: action.payload });
    case `${SUBMIT_CAMPAIGN}_PENDING`:
    case `${SCHEDULE_USER_AS_VOL}_PENDING`:
      return Object.assign({}, state, { isSubmitting: true });
    case `${SUBMIT_CAMPAIGN}_FULFILLED`:
      console.log(action);
      return Object.assign({}, state, {
        isSubmitting: false,
        campaigns: action.payload.data
      });

    case `${CREATE_EVENT}_FULFILLED`:
      return Object.assign({}, state, { events: action.payload.data });
    case `${UPDATE_CAMPAIGN_INFO}_FULFILLED`:
      return Object.assign({}, state, { campaigns: action.payload.data });
    case `${GET_JOINED}_FULFILLED`:
      return Object.assign({}, state, { joined: action.payload });
    case `${GET_SCHEDULED}_FULFILLED`:
      return Object.assign({}, state, { scheduled: action.payload });
    case `${GET_USER_ROLE}_FULFILLED`:
      return Object.assign({}, state, { role: action.payload });
    case `${SCHEDULE_USER_AS_VOL}_FULFILLED`:
      console.log(action.type, action.payload);
      return Object.assign({}, state, {
        isSubmitting: false,
        scheduled: action.payload
      });
    case `${GET_VOLS_SCHEDULED}_FULFILLED`:
      console.log(action.type, action.payload);
      return Object.assign({}, state, {
        volsScheduled: action.payload
      });
    default:
      return state;
  }
}
