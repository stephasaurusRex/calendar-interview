import React from "react";
import { connect } from 'react-redux'
import { string, array } from "prop-types";

import { hour } from "../../styles/dayView.module.css";

class HourCell extends React.Component {
  static propTypes = {
    hourString: string.isRequired,
    events: array,
  };

  render() {
    return (
      <div className={hour}>
        {this.props.hourString}
      </div>
    );
  }

}

export default connect()(HourCell);