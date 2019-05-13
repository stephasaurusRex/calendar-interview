import React from "react";
import classNames from "classnames";
import moment from "moment";

import { gridCellComponent, thisMonthCell, dateBubble, todayBubble, dateTitle } from "../styles/dateCell.module.css";

export default function DateCell({ date, month, events, onTogglePanel, panelOpen, onUpdatePanelEvent, fetchUsers }) {
  const isThisMonth = month === date.month();

  const isToday = date.isSame(moment(), "day");

  const classes = classNames(gridCellComponent, { [thisMonthCell]: isThisMonth });

  const dateBubbleClasses = classNames(dateBubble, { [thisMonthCell]: isThisMonth, [todayBubble]: isToday });

  const dateTitleClasses = classNames(dateTitle);

  return (
    <div className={classes}>
      <div>
        <div className={dateBubbleClasses}>{date.date()}</div>
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
