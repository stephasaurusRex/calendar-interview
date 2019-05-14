import React from "react";
import { connect } from 'react-redux'
import { number, object, func, array, bool } from "prop-types";
import moment from "moment";

import { monthViewComponent, monthViewHeader, gridWrapper, headerItem, weekRow } from "../styles/monthView.module.css";

const HOURS_OF_DAY = [1,2,3,4,5,6,7,8,9,10,11,12];

class DayView extends React.Component {
  static propTypes = {
    momentizedDate: object.isRequired, // TODO: shape
    year: number.isRequired,
    month: number.isRequired,
    fetchEvents: func.isRequired,
    events: array,
    onTogglePanel: func.isRequired,
    panelOpen: bool.isRequired,
    onUpdatePanelEvent: func.isRequired,
    fetchUsers: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <div>
       DAY VIEW
      </div>
    );
  }

  renderHeaderItem = (day) => {
    return <span className={headerItem} key={day}>{day}</span>
  }


  // return copy of given date so we don't mutate
  getDate = () => {
    return moment(this.props.momentizedDate);
  }


}

export default connect()(DayView);