import React, {Component} from 'react';
import format from 'date-fns/format';
// const Skycons = require('skycons')(window);

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
  }

  // componentDidMount() {
  //   const {forecast} = this.props;
  //   if (forecast) {
  //     const skycons = Skycons({color: 'black'});
  //     skycons.add(this.iconRef.current, forecast.icon);
  //   }
  // }

  render() {
    const {forecast} = this.props;

    if (!forecast) {
      return null;
    }

    return (
      <div className="forecast">
        <div className="forecast__time">{formatTime(forecast.time)}</div>

        <div className="forecast__highlights">
          <div className="forecast__temperature pop">
            {Math.round(forecast.temperature)}&deg;
          </div>
          <div className="forecast__icon">
            <canvas width="100%" height="100%" ref={this.iconRef} />
          </div>
        </div>

        <div className="forecast__text">
          <div className="forecast__summary">{forecast.summary}</div>
          {renderFeelsLike(forecast.temperature, forecast.apparentTemperature)}
          {renderPrecipitation(forecast.precipProbability, forecast.precipType)}
          {renderWind(forecast.windSpeed)}
        </div>
      </div>
    );
  }
}

function formatTime(seconds) {
  const date = new Date(seconds * 1000).toString();
  return format(date, 'h:mm aa');
}

function renderFeelsLike(temperature, apparentTemperature) {
  if (Math.abs(temperature - apparentTemperature) < 4) {
    return null;
  }

  return (
    <div className="forecast__feels-like">
      feels like{' '}
      <span className="pop">{Math.round(apparentTemperature)}&deg;</span>
    </div>
  );
}

function renderPrecipitation(probability, type) {
  if (!type) {
    return null;
  }

  const formatted = Math.round(probability * 100);

  return (
    <div className="forecast__precipitation">
      <span className="pop">{formatted}%</span> chance of{' '}
      <span className="pop">{type}</span>
    </div>
  );
}

function renderWind(windSpeed) {
  if (windSpeed < 5) {
    return null;
  }
  const formatted = Math.round(windSpeed);
  return (
    <div className="forecast__wind">
      winds at <span className="pop">{formatted} mph</span>
    </div>
  );
}
