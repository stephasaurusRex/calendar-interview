import { combineReducers } from "redux";

import ui from "../reducers/uiReducer";
import events from "../reducers/eventReducer";
import users from "../reducers/userReducer";

export default combineReducers({ ui, events, users });
