import React, {Component} from 'react';
import format from 'date-fns/format';

import Forecast from './Forecast';

export default class Day extends Component {
  render() {
    const {date, forecast} = this.props;
    return (
      <div className="day">
        <h2 className="day__header">
          <div className="day__day">{format(date, 'ddd')}</div>
          <div className="day__date">{format(date, 'MMM d')}</div>
        </h2>
        <Forecast forecast={forecast.am} />
        <Forecast forecast={forecast.pm} />
      </div>
    );
  }
}
