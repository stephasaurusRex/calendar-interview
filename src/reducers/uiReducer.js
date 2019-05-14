import { TOGGLE_PANEL, UPDATE_PANEL_EVENT, UPDATE_RESOLUTION } from "../actions/uiActions";

const INITIAL_STATE = {
  panelOpen: false,
  panelEvent: {},
  resolution: 'month',
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
    case UPDATE_RESOLUTION:
      return {
        ...state,
        resolution: action.resolution,
      }
    default:
      return state;
  }
}
