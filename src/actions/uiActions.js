export const TOGGLE_PANEL = "CALENDAR/UI/TOGGLE_PANEL";
export const UPDATE_PANEL_EVENT= "CALENDAR/UI/UPDATE_PANEL_EVENT";
export const UPDATE_RESOLUTION = "CALENDAR/UI/UPDATE_RESOLUTION";

export function togglePanel() {
  return { type: TOGGLE_PANEL };
}

export function updatePanelEvent(event) {
  return {
    type: UPDATE_PANEL_EVENT,
    event
  }
}

export function updateResolution(resolution) {
  return {
    type: UPDATE_RESOLUTION,
    resolution
  }
}
