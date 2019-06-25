import React from "react";
import { connect } from 'react-redux'
import { string, array } from "prop-types";
import Event from "./event";

import { hour } from "../../styles/dayView.module.css";

class HourCell extends React.Component {
  static propTypes = {
    hourString: string.isRequired,
    hourEvents: array,
    onHourClick: Function,
  };

  getEventTime = (clickEvent) => {
    clickEvent.persist();
    console.log(clickEvent);
  }

  render() {
    return (
      <div
        className={hour}
        onClick={(clickEvent) => this.getEventTime(clickEvent)}
      >
        {this.props.hourString}
        {this.props.hourEvents.map((event) => <Event key={event.id} event={event}/>)}
      </div>
    );
  }

}

export default connect()(HourCell);