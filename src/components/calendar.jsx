import React from "react";
import moment from "moment";

import MonthView from "./monthView";
import Header from "./header";
import EventDetails from "./eventDetails";

import {
  calendarComponent,
  headerWrapper,
  viewWrapper,
  sidePanelWrapper,
  bodyWrapper,
} from "../styles/calendar.module.css";

const VIEW_MAPPING = {
  month: MonthView,
  day: DayView,
};

export default class Calendar extends React.Component {
  render() {
    const {
      resolution,
      year,
      month,
      day,
      panelOpen,
      onTogglePanel,
      onFetchEvents,
      events,
      panelEvent,
      onUpdatePanelEvent,
      onFetchUsers,
      panelUsers,
    } = this.props;

    const ViewComponent = VIEW_MAPPING[resolution] || MonthView;

    return (
      <div className={calendarComponent}>
        <div className={headerWrapper}>
          <Header
            year={year}
            month={month}
            day={day}
            momentizedDate={this.getMomentizedDate()}
            onChangeDate={this.handleChangeDate}
            onTogglePanel={onTogglePanel}
            panelOpen={panelOpen}
            resolution={resolution}
          />
        </div>
        <div className={bodyWrapper}>
          <div className={viewWrapper}>
            <ViewComponent
              year={year}
              month={month}
              day={day}
              momentizedDate={this.getMomentizedDate()}
              fetchEvents={onFetchEvents}
              onTogglePanel={onTogglePanel}
              onUpdatePanelEvent={onUpdatePanelEvent}
              panelOpen={panelOpen}
              events={events}
              fetchUsers={onFetchUsers}
            />
          </div>
          {
            panelOpen &&
            <div className={sidePanelWrapper}>
              <EventDetails panelEvent={panelEvent} panelUsers={panelUsers}/>
            </div>
          }
        </div>
      </div>
    );
  }

  getMomentizedDate = () => {
    const { year, month, day } = this.props;

    return moment([year, month, day]);
  }

  handleChangeDate = (updates) => {
    this.props.history.push(this.buildUrl(updates));
  }

  buildUrl = (params = {}) => {
    const { resolution, year, month, day } = { ...this.props, ...params };

    return `/${resolution}/${year}/${month + 1}/${day}`;
  }
}
