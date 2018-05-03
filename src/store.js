import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import campaignReducer from "./ducks/campaignReducer";
import userReducer from "./ducks/userReducer";
import commsReducer from "./ducks/commsReducer";

const store = createStore(
  combineReducers({
    userReducer,
    campaignReducer,
    commsReducer
  }),
  applyMiddleware(promiseMiddleware())
);

export default store;
