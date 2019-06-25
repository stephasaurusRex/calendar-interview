import React from "react";
import { bool, number, func, string } from "prop-types";
import moment from "moment";

import Icon from "./icon";

import { headerComponent, changeDateButton, todayButton, panelToggleButton, monthTitle } from "../styles/header.module.css";

const MONTHS_WITH_THIRTY_DAYS = [4, 6, 9, 11]; //April, June, September, November
const MONTHS_WITH_THIRTY_ONE_DAYS = [1, 3, 5, 7, 8, 12]; //Jan, March, May, July, Aug, Dec
const FEBRUARY = [2];

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
    return this.renderHeader(this.props.resolution);
  }

  renderHeader = (resolution) => {
    return (
      <div className={headerComponent}>
        <div>
          <button className={todayButton} onClick={this.handleSetToday}>
            Today
          </button>
          <button className={changeDateButton}
                  onClick={resolution === "month" ?
                    this.handleChangeMonthCurry(-1) :
                    this.handleChangeDayCurry(-1)}>
            <Icon name="angle-left" />
          </button>
          <button className={changeDateButton}
                  onClick={resolution === "month" ?
                    this.handleChangeMonthCurry(1) :
                  this.handleChangeDayCurry(1)}>
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

  nextMonth = (baseParams, month) => {
    return {...baseParams, month: this.props.month, day: 1};
  }

  nextYear = (baseParams, year) => {
    return {...baseParams, day: 1, month: 0, year: year};
  }

  lastMonth = (baseParams, month, day) => {
    return {...baseParams, month: month, day: day};
  }

  lastYear = (baseParams, year) => {
    return {...baseParams, month: 11, year: year, day: 31};
  }

  getDateParams = (change) => {
    switch (this.props.resolution) {
      case "day": {
        const baseParams = {day: change, month: this.props.month, year: this.props.year, resolution: this.props.resolution};

        switch(change) {
          case 31: {
            if( MONTHS_WITH_THIRTY_DAYS.includes(this.props.month + 1) ) {
              return this.nextMonth(baseParams, this.props.month + 1);
            }
            break;
          }
          case 32: {
            if( MONTHS_WITH_THIRTY_ONE_DAYS.includes(this.props.month + 1) ) {
              return this.props.month === 11 ?
                 this.nextYear(baseParams, this.props.year + 1) :
                 this.nextMonth(baseParams, this.props.month + 1);
            }
            break;
          }
          case 29:{
            if( FEBRUARY.includes(this.props.month + 1) ) {
              return this.nextMonth(baseParams, this.props.month + 1);
            }
            break;
          }
          case 0: {
             if( this.props.day === 1 ) {
               if( this.props.month === 0 ) {
                 return this.lastYear(baseParams, this.props.year - 1);
               } else if( MONTHS_WITH_THIRTY_DAYS.includes(this.props.month + 1) ) {
                 return this.lastMonth(baseParams, this.props.month - 1, 31);
               } else if (MONTHS_WITH_THIRTY_ONE_DAYS.includes(this.props.month + 1)) {
                 return this.lastMonth(baseParams, this.props.month - 1, 30);
               } else {
                 return this.lastMonth(baseParams, this.props.month - 1, 28);
               }
             }
             return {...baseParams, month: this.props.month, day: this.props.day - 1};
          }
          default:
            return baseParams;
        }
        return baseParams;
      }
      case "month":
      default: {
        const baseParams = {day: 1, month: change, year: this.props.year, resolution: 'month'};

        switch (change) {
          case 12:
            return this.nextYear(baseParams, this.props.year + 1);
          case -1:
            return this.lastYear(baseParams, this.props.year - 1);
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
