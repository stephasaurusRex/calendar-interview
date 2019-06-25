import React from "react";
import { connect } from 'react-redux'
import { number, object, func, array, bool } from "prop-types";
import moment from "moment";
import HourCell from "./hourCell";

import { dayView, dateTitle, dayViewBody } from "../../styles/dayView.module.css";

const HOURS_OF_DAY = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];

class DayView extends React.Component {
  static propTypes = {
    momentizedDate: object.isRequired,
    year: number.isRequired,
    month: number.isRequired,
    fetchEvents: func.isRequired,
    events: array,
    onTogglePanel: func.isRequired,
    panelOpen: bool.isRequired,
    onUpdatePanelEvent: func.isRequired,
    fetchUsers: func.isRequired,
  };

  render() {

    //let todaysEvents = this.filterDates(this.props.events);

    return (
      <div className={dayView}>
        <div className={dateTitle}>{this.getDate().format('dddd, MMMM DD')}</div>
        <div className={dayViewBody}>
          { HOURS_OF_DAY.map(
            (hour, index) => {
              let hourString = index < 12 || index === 24 ? `${hour}:00am` : `${hour}:00pm`;
              let hourEvents = [];
              todaysEvents.forEach((event) => {
                if(hourString === moment(event.startDate).format(`h:00a`)) {
                  hourEvents.push(event);
                }
              })
              return <HourCell
                key={hourString + index}
                hourString={hourString}
                hourEvents={hourEvents}
                date={this.getDate()}
              />
            }
          ) }
        </div>
      </div>
    );
  }

  // filterDates = (events) => {
  //   let date = this.getDate();
  //   return events.filter((event) => {
  //       var momentDate = date.format('YYYY MM DD');
  //       var momentEvent = moment(event.startDate).format('YYYY MM DD');
  //       return momentDate === momentEvent;
  //     });
  // }

  // return copy of given date so we don't mutate
  getDate = () => {
    return moment(this.props.momentizedDate);
  }


}

export default connect()(DayView);