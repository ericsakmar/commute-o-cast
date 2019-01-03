import React, {Component} from 'react';
import {Settings as SettingsIcon} from 'react-feather';

import Day from './Day';
import Settings from './Settings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showSettings: false,
      settings: {
        am: 7,
        pm: 17,
      },
    };
  }

  async componentDidMount() {
    this.setState({loading: true});

    try {
      const location = await this.getLocation();
      const res = await fetch(
        `/.netlify/functions/forecast?lat=${location.lat}&lon=${location.lon}&am=7&pm=17`,
      );
      const forecast = await res.json();
      this.setState({forecast, loading: false, error: null});
    } catch (error) {
      this.setState({error, loading: false});
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="pop">Commute-o-Cast</h1>
        </header>
        {this.renderLoading()}
        {this.renderError()}
        {this.renderDays()}
      </div>
    );
  }

  renderToolbar() {
    return (
      <div className="app__toolbar">
        <button
          className="app__toolbar-button"
          onClick={() =>
            this.setState({showSettings: !this.state.showSettings})
          }>
          <SettingsIcon size="1.25em" />
        </button>
      </div>
    );
  }

  renderSettings() {
    const {showSettings, settings} = this.state;

    if (!showSettings) {
      return null;
    }

    return (
      <Settings
        settings={settings}
        onChange={changes => {
          const nextSettings = {...settings, ...changes};
          this.setState({settings: nextSettings});
        }}
      />
    );
  }

  renderLoading() {
    const {loading} = this.state;

    if (!loading) {
      return false;
    }

    return (
      <div className="app__loading">
        <div className="app__loading-icon">
          <span role="img" aria-label="loading icon">
            🚴
          </span>
        </div>
        <div className="app__loading-text">Loading&#8230;</div>
      </div>
    );
  }
  renderError() {
    const {error} = this.state;
    if (!error) {
      return null;
    }
    return <div className="app__error">{error}</div>;
  }
  renderDays() {
    const {forecast} = this.state;
    if (!forecast) {
      return null;
    }
    console.log(forecast)
    const days = forecast.map(f => this.renderDay(f));
    return <div className="app__days">{days}</div>;
  }
  renderDay(forecast) {
    if (!forecast.am && !forecast.pm) {
      return null;
    }
    if (forecast.am) {
      return (
        <Day date={new Date(forecast.am.time * 1000)} forecast={forecast} />
      );
    } else {
      return (
        <Day date={new Date(forecast.pm.time * 1000)} forecast={forecast} />
      );
    }
  }
  getLocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject('Location not available.');
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude.toFixed(1),
            lon: position.coords.longitude.toFixed(1),
          });
        },
        error => reject(error),
      );
    });
  }
}
export default App;
