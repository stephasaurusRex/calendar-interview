import moment from "moment";
import { connect } from "react-redux";

import applyHOCs from "../helpers/applyHOCs";
import withProps from "../hocs/withProps";
import withRedirect from "../hocs/withRedirect";

import { togglePanel, updatePanelEvent, updateResolution } from "../actions/uiActions";
import { fetchEvents } from "../actions/eventActions";
import { fetchUsers } from "../actions/userActions";

import Calendar from "./calendar";

function getRouteParams(props) {
  const { year, month: humanMonth, day, resolution } = props.match.params;

  return {
    resolution,
    year: Number(year),
    month: Number(humanMonth) - 1, // Jan === 0
    day: Number(day),
  };
}

function buildUrl(props) {
  const {resolution} = props;
  const [year, monthIndex, day] = moment().toArray();

  return `/${resolution}/${year}/${monthIndex + 1}/${day}`;
}

function isInvalidDate(props) {
  const { year, month, day } = props;
  const momentized = moment([year, month, day]);

  return !momentized.isValid();
}

function mapStateToProps(state) {
  return {
    panelOpen: state.ui.panelOpen,
    events: state.events.events,
    panelEvent: state.ui.panelEvent,
    panelUsers: state.users.panelUsers,
    resolution: state.ui.resolution,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTogglePanel: () => dispatch(togglePanel()),
    onFetchEvents: () => dispatch(fetchEvents()),
    onUpdatePanelEvent: (calendarEvent) => dispatch(updatePanelEvent(calendarEvent)),
    onFetchUsers: (users) => dispatch(fetchUsers(users)),
    onUpdateResolution: (resolution) => dispatch(updateResolution(resolution))
  };
}

export default applyHOCs(
  withProps(getRouteParams),
  withRedirect(isInvalidDate, buildUrl),
  connect(mapStateToProps, mapDispatchToProps),
)(Calendar)
