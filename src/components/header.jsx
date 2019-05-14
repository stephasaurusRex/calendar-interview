import React from "react";
import { bool, number, func, string } from "prop-types";
import moment from "moment";

import Icon from "./icon";

import { headerComponent, changeDateButton, todayButton, panelToggleButton, monthTitle } from "../styles/header.module.css";
import {updateResolution} from "../actions/uiActions";

export default class Header extends React.Component {
  static propTypes = {
    month: number.isRequired,
    onChangeDate: func.isRequired,
    onTogglePanel: func.isRequired,
    panelOpen: bool.isRequired,
    resolution: string.isRequired,
    onUpdateResolution: func.isRequired,
  }

  render() {
    switch (this.props.resolution) {
      case "day":
        return this.renderDayHeader();
      case "month":
      default:
        return this.renderMonthHeader();
    }
  }

  renderMonthHeader = () => {
    return (
      <div className={headerComponent}>
        <div>
          <button className={todayButton} onClick={this.handleSetToday}>
            Today
          </button>
          <button className={changeDateButton} onClick={this.handleChangeMonthCurry(-1)}>
            <Icon name="angle-left" />
          </button>
          <button className={changeDateButton} onClick={this.handleChangeMonthCurry(1)}>
            <Icon name="angle-right" />
          </button>
          <button
            className={monthTitle}
            onClick={this.handleChangeMonthCurry(0)}
          >
            {this.props.momentizedDate.format("MMMM YYYY")}
          </button>
        </div>
        <button className={panelToggleButton} onClick={this.props.onTogglePanel}>
          {this.props.panelOpen && <Icon name="caret-square-right" solid={false} />}
          {!this.props.panelOpen && <Icon name="caret-square-left" solid={false} />}
        </button>
      </div>
    )
  }

  renderDayHeader = () => {
    return (
      <div className={headerComponent}>
        <div>
          <button className={todayButton} onClick={this.handleSetToday}>
            Today
          </button>
          <button className={changeDateButton} onClick={this.handleChangeDayCurry(-1)}>
            <Icon name="angle-left" />
          </button>
          <button className={changeDateButton} onClick={this.handleChangeDayCurry(1)}>
            <Icon name="angle-right" />
          </button>
          <button
            className={monthTitle}
            onClick={() => this.props.onUpdateResolution('month')}
          >
            {this.props.momentizedDate.format("MMMM YYYY")}
          </button>
        </div>
        <button className={panelToggleButton} onClick={this.props.onTogglePanel}>
          {this.props.panelOpen && <Icon name="caret-square-right" solid={false} />}
          {!this.props.panelOpen && <Icon name="caret-square-left" solid={false} />}
        </button>
      </div>
    )
  }

  handleChangeMonthCurry = (prevOrNext) => {
    return () => {
      const month = (this.props.month + prevOrNext);

      this.props.onChangeDate(this.getDateParams(month));
    };
  }

  handleChangeDayCurry = (prevOrNext) => {
    return () => {
      const day = (this.props.day + prevOrNext);

      this.props.onChangeDate(this.getDateParams(day));
    };
  }

  getDateParams = (change) => {
    switch (this.props.resolution) {
      case "day": {
        return {day: change, month: this.props.month, year: this.props.year, resolution: 'day'};
      }
      case "month":
      default: {
        const baseParams = {day: 1, month: change, year: this.props.year, resolution: 'month'};

        switch (change) {
          case 12:
            return {...baseParams, month: 0, year: this.props.year + 1};
          case -1:
            return {...baseParams, month: 11, year: this.props.year - 1};
          default:
            return baseParams;
        }
      }
    }


  }

  handleSetToday = () => {
    const [year, monthIndex, day] = moment().toArray();

    this.props.onChangeDate({ year, month: monthIndex, day });
  }
}
