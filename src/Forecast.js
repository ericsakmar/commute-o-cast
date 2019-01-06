import React, {Component} from 'react';
import format from 'date-fns/format';
// const Skycons = require('skycons')(window);
import {Cloud, CloudRain, CloudSnow, Sun, Wind} from 'react-feather';

export default class Forecast extends Component {
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
          <div className="forecast__icon">{this.renderIcon()}</div>
        </div>

        <div className="forecast__text">
          <div className="forecast__summary">{forecast.summary}</div>
          {renderFeelsLike(forecast.temperature, forecast.apparentTemperature)}
          {renderPrecipitation(forecast.precipProbability, forecast.precipType)}
          {renderWind(forecast.windSpeed)}
          {renderHumidity(forecast.humidity)}
        </div>
      </div>
    );
  }

  renderIcon() {
    const {icon} = this.props.forecast;

    if (!icon) {
      return null;
    }

    switch (icon) {
      case 'cloudy':
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
      case 'fog':
        return <Cloud size="2em" />;

      case 'clear-day':
      case 'clear-night':
        return <Sun />;

      case 'rain':
        return <CloudRain />;

      case 'snow':
      case 'sleet':
        return <CloudSnow />;

      case 'wind':
        return <Wind />;

      default:
        return null;
    }
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

function renderHumidity(humidity) {
  const formatted = Math.round(humidity * 100);
  return (
    <div className="forecast__wind">
      <span className="pop">{formatted}%</span> humidity
    </div>
  );
}
