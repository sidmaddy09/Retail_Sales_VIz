import { combineReducers } from "redux";
import dataReducer from "./dataReducer.ts"; // Adjust path based on your setup

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;