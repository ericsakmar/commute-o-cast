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

    const today = new Date();

    return (
      <div className="app">
        <header className="app__header">
          <h1 className="pop">Commute-o-Cast</h1>
        </header>

        <div className="app__days">
          <Day date={today} forecast={forecast[0]} />
          <Day date={today} forecast={forecast[1]} />
          <Day date={today} forecast={forecast[2]} />
        </div>
      </div>
    );
  }
}

export default App;
