export const TOGGLE_PANEL = "CALENDAR/UI/TOGGLE_PANEL";
export const UPDATE_PANEL_EVENT= "CALENDAR/UI/UPDATE_PANEL_EVENT";
export const UPDATE_RESOLUTION = "CALENDAR/UI/UPDATE_RESOLUTION";
export const HOUR_CLICK = "CALENDAR/UI/HOUR_CLICK";

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

export function hourClick(hour) {
  return {
    type: HOUR_CLICK,
    hour
  }
}
