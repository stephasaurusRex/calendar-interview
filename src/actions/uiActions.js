export const TOGGLE_PANEL = "CALENDAR/UI/TOGGLE_PANEL";
export const UPDATE_PANEL_EVENT= "CALENDAR/UI/UPDATE_PANEL_EVENT";

export function togglePanel() {
  return { type: TOGGLE_PANEL };
}

export function updatePanelEvent(event) {
  return {
    type: UPDATE_PANEL_EVENT,
    event
  }
}
