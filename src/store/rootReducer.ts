import { combineReducers } from "@reduxjs/toolkit";
import headerReducer from "./slices/headerSlice";

const rootReducer = combineReducers({
  header: headerReducer,
  // ...other reducers
});

export default rootReducer;
