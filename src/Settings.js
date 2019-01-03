import React, {Component} from 'react';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings
    };
  }

  render() {
    const {am, pm} = this.props.settings;

    return (
      <div className="settings">
        <form className="settings__form" onSubmit={this.onSubmit.bind(this)}>
          <div className="settings__field">
            <label htmlFor="am">am:</label>
            <select
              id="am"
              value={am}
              onChange={evt => this.onChange({am: evt.target.value})}>
              <option value="1">1:00am</option>
              <option value="2">2:00am</option>
              <option value="3">3:00am</option>
              <option value="4">4:00am</option>
              <option value="5">5:00am</option>
              <option value="6">6:00am</option>
              <option value="7">7:00am</option>
              <option value="8">8:00am</option>
              <option value="9">9:00am</option>
              <option value="10">10:00am</option>
              <option value="11">11:00am</option>
            </select>
          </div>

          <div className="settings__field">
            <label htmlFor="pm">pm:</label>
            <select
              id="pm"
              value={pm}
              onChange={evt => this.onChange({pm: evt.target.value})}>
              <option value="12">12:00pm</option>
              <option value="13">1:00pm</option>
              <option value="14">2:00pm</option>
              <option value="15">3:00pm</option>
              <option value="16">4:00pm</option>
              <option value="17">5:00pm</option>
              <option value="18">6:00pm</option>
              <option value="19">7:00pm</option>
              <option value="20">8:00pm</option>
              <option value="21">9:00pm</option>
              <option value="22">10:00pm</option>
              <option value="23">11:00pm</option>
            </select>
          </div>

          <input type="submit" value="Update" className="action" />
        </form>
      </div>
    );
  }

  onChange(changes) {
    // this.props.onChange(changes);
  }

  onSubmit(evt) {
    evt.preventDefault();
  }
}
