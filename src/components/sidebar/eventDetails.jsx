import React from "react";
import moment from "moment";

import UserDisplay from "./userDisplay";

import { detail, detailTitle, detailDate, detailUsers, detailDescription } from "../../styles/eventDetails.module.css";

export default function EventDetails({ panelEvent, panelUsers }) {
  return (
    <div className={detail}>
      <div className={detailTitle}>
        {panelEvent.title}
      </div>
      <div className={detailDate}>
        {
         getDetailDateTimeDisplay(panelEvent.startDate, panelEvent.endDate)
        }
      </div>
      {
        panelEvent.description && panelEvent.description.length > 0 ?
        (<div className={detailDescription}>
            { panelEvent.description }
        </div>)
        : null
      }
      { panelUsers && panelUsers.length > 0 ?
        ( <>
          <div className={detailUsers}>Invitees:</div>
          { panelUsers.map((panelUser) => <UserDisplay key={panelUser.name} user={panelUser}/>) }
          </> )   : <div className={detailUsers}>No Invitees</div> }
    </div>
  );
}

export function getDetailDateTimeDisplay(startDate, endDate) {

  let dateString = "";

  if(moment(startDate).isValid() && moment(endDate).isValid()) {
    if (moment.utc(startDate).format('YYYY MM DD') === moment.utc(endDate).format('YYYY MM DD')) {
      dateString = `${moment.utc(startDate).format('dddd MMMM Do, YYYY h:MMa')} - ${moment.utc(endDate).format('h:MMa')}`
    } else {
      dateString = `${moment(startDate).format('dddd MMMM Do, YYYY h:MMa')} - ${moment.utc(endDate).format('dddd MMMM Do, YYYY h:MMa')}`
    }
  }

  return dateString;
}
