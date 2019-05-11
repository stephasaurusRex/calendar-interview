import React from "react";
import { connect } from 'react-redux'
import { number, object } from "prop-types";
import moment from "moment";
import fetchEvents from "../actions/eventActions";

import chunkArray from "../helpers/chunkArray";
import DateCell from "./dateCell";

import { monthViewComponent, monthViewHeader, gridWrapper, headerItem, weekRow } from "../styles/monthView.module.css";

const DAYS_OF_WEEK = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

class MonthView extends React.Component {
  static propTypes = {
    momentizedDate: object.isRequired, // TODO: shape
    year: number.isRequired,
    month: number.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(fetchEvents()).then((events) => {
      this.setState( { events } );
    });
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

    return <DateCell key={key} date={date} month={this.props.month} />;
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