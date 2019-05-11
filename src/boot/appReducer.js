import { combineReducers } from "redux";

import ui from "../reducers/uiReducer";
import events from "../reducers/eventReducer";

export default combineReducers({ ui, events });
