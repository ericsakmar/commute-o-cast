import React, {Component} from 'react';

import Day from './Day';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});

    try {
      // TODO get users location
      // TODO reduce precision to make caching better
      const res = await fetch('/forecast?lat=40.44&lon=-79.99');
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
    return (
      <div className="app__days">
        {this.renderDay(forecast[0])}
        {this.renderDay(forecast[1])}
        {this.renderDay(forecast[2])}
      </div>
    );
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
}
export default App;
