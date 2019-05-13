import { TOGGLE_PANEL, UPDATE_PANEL_EVENT } from "../actions/uiActions";

const INITIAL_STATE = {
  panelOpen: false,
  panelEvent: {},
};

export default function uiReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case TOGGLE_PANEL:
      return {
        ...state,
        panelOpen: !state.panelOpen,
      };
    case UPDATE_PANEL_EVENT:
      return {
        ...state,
        panelEvent: action.event,
      };
    default:
      return state;
  }
}
