import React from "react";
import { connect } from 'react-redux'
import { number, object, func, array, bool } from "prop-types";
import moment from "moment";

import chunkArray from "../../helpers/chunkArray";
import DateCell from "./dateCell";

import { monthViewComponent, monthViewHeader, gridWrapper, headerItem, weekRow } from "../../styles/monthView.module.css";

const DAYS_OF_WEEK = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

class MonthView extends React.Component {
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
    onChangeDate: func.isRequired,
    onUpdateResolution: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const dates = this.getDates();
    const weeks = chunkArray(dates, 7);
    return (
      <div className={monthViewComponent}>
        <div className={monthViewHeader}>{DAYS_OF_WEEK.map(this.renderHeaderItem)}</div>
        <div className={gridWrapper}>
          {weeks.map((days, i) => {
            return (
              <div key={`week-${i}`} className={weekRow}>
                {days.map(this.renderGridCell)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderHeaderItem = (day) => {
    return <span className={headerItem} key={day}>{day}</span>
  }

  renderGridCell = (date) => {
    const key = date.toString();

    let dayEvents = this.props.events ?
      this.props.events.filter((event) => {
        var momentDate = date.format('YYYY MM DD');
        var momentEvent = moment(event.startDate).format('YYYY MM DD');
        return momentDate === momentEvent;
      })
      : [];

    return <DateCell key={key}
                     date={date}
                     month={this.props.month}
                     events={dayEvents}
                     onTogglePanel={this.props.onTogglePanel}
                     panelOpen={this.props.panelOpen}
                     onUpdatePanelEvent={this.props.onUpdatePanelEvent}
                     fetchUsers={this.props.fetchUsers}
                     onChangeDate={this.props.onChangeDate}
                     onUpdateResolution={this.props.onUpdateResolution}
    />;
  }

  getDates = () => {
    const { start, end } = this.getDateRange();
    let iterator = moment(start);
    const dates = [];

    while (iterator.isSameOrBefore(end)) {
      dates.push(moment(iterator))
      iterator.add(1, "day")
    }

    return dates;
  }

  getDateRange = () => {
    return {
      start: this.getDate().startOf("month").startOf("week"),
      end: this.getDate().endOf("month").endOf("week"),
    };
  }

  // return copy of given date so we don't mutate
  getDate = () => {
    return moment(this.props.momentizedDate);
  }

}

export default connect()(MonthView);