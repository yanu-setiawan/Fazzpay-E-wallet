import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import userSlice from "./user";
import profileSlice from "./profile";
import trasactionsSlice from "./transactions";

const reducers = combineReducers({
  auth: authSlice,
  user: userSlice,
  profile: profileSlice,
  transactions: trasactionsSlice,
});

export default reducers;
