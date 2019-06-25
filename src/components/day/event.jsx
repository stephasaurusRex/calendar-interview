import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';

import { dayEvent, dayEventTitle } from "../../styles/dayView.module.css";

class Event extends React.Component {
  static propTypes = {
    event: Object,
  };

  render() {
    return (
      <div className={dayEvent} style={{ top: this.getTopOffset(this.props.event.startDate) }}>
        <span className={dayEventTitle}>{this.props.event.title}</span>
        <div>
          {this.props.event.description}
        </div>
      </div>
    );
  }

  getTopOffset = (startDate) => {
    //minutes divided by 60 = fractional hour
    console.log(startDate);
    const minutes = moment(startDate).format('m');
    const fractionalHour = minutes / 60;
    return 50 * fractionalHour;

    //50 * fractional hour = top offset
  }

  getHeight = () => {
    //24 hour time to get number of hours (in cases less than one day)
    //50+number of hours == height
    //edge cases = extends over more than one day
    //starts on a different day
    //var duration = moment.duration(end.diff(startTime));
    //var hours = duration.asHours();
  }
}

export default connect()(Event);