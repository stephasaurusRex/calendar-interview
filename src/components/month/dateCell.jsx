import React from "react";
import classNames from "classnames";
import moment from "moment";

import { gridCellComponent, thisMonthCell, dateBubble, todayBubble, dateTitle } from "../../styles/dateCell.module.css";

export default function DateCell({ date, month, events, onTogglePanel, panelOpen, onUpdatePanelEvent, fetchUsers, onChangeDate, onUpdateResolution }) {
  const isThisMonth = month === date.month();

  const isToday = date.isSame(moment(), "day");

  const classes = classNames(gridCellComponent, { [thisMonthCell]: isThisMonth });

  const dateBubbleClasses = classNames(dateBubble, { [thisMonthCell]: isThisMonth, [todayBubble]: isToday });

  const dateTitleClasses = classNames(dateTitle);

  return (
    <div className={classes}>
      <div>
        <div className={dateBubbleClasses}
             onClick={() => {
               const [year, monthIndex, day] = moment(date).toArray();
               onUpdateResolution('day');
               onChangeDate({
                 resolution: 'day',
                 year,
                 day,
                 monthIndex,
              });
             }}
        >
          {date.date()}
          </div>
        {events.map((calendarEvent) => {
          return (
            <div
              key={calendarEvent.startDate + calendarEvent.title}
              onClick={() => {
                if(!panelOpen) {
                  onTogglePanel();
                }
                onUpdatePanelEvent(calendarEvent);
                fetchUsers(calendarEvent.userIds);
              }}
              className={dateTitleClasses}>
              {calendarEvent.title}
            </div>
          )
        })}
      </div>
    </div>
  );
}
