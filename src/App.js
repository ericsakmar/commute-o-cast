import React, {Component} from 'react';

import Day from './Day';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const res = await fetch('/forecast?lat=40.4405556&lon=-79.9961111');
    const forecast = await res.json();
    this.setState({forecast});
  }

  render() {
    const {forecast} = this.state;

    if (!forecast) {
      return <div>loading</div>;
    }

    return (
      <div className="app">
        <header className="app__header">
          <h1 className="pop">Commute-o-Cast</h1>
        </header>

        <div className="app__days">
          {this.renderDay(forecast[0])}
          {this.renderDay(forecast[1])}
          {this.renderDay(forecast[2])}
        </div>
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
