import React, { Component } from "react";
import countriesInfo from "world-countries";

const countries = countriesInfo
  .filter(c => c.status === "officially-assigned")
  .sort((c1, c2) => (c1.name.common > c2.name.common ? 1 : -1));

const defaultForm = {
  countryCode: undefined,
  startDate: null
};

class Move extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.commitHandler = this.commitHandler.bind(this);
    this.state = {
      form: Object.assign({}, defaultForm, {
        countryCode: props.countryCode,
        startDate: props.startDate
      })
    };
  }

  changeHandler(ev) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [ev.target.name]: ev.target.value
      })
    });
  }

  commitHandler() {
    if (this.state.form.countryCode && this.state.form.startDate) {
      this.props.handleCommit(this.props.id, {
        countryCode: this.state.form.countryCode,
        startDate: this.state.form.startDate
      });
    } else {
      console.warn('should display an error here');
    }
  }

  render() {
    const form = this.state.form;

    if (!this.props.editing) {
      const country = countries.find(
        country => country.cca3 === form.countryCode
      );
      return (
        <div>
          <label>
            <span>Country</span>
            {country.name.common}
          </label>
          <label>
            <span>Start date</span>
            {form.startDate}
          </label>
          <button onClick={() => this.props.handleSetEditing(this.props.id)}>
            Edit
          </button>
        </div>
      );
    }

    return (
      <div>
        <label>
          <span>Country</span>
          <select
            name="countryCode"
            onChange={this.changeHandler}
            value={form.countryCode}
          >
            <option value="">-- please select --</option>
            {countries.map(country => (
              <option key={country.cca3} value={country.cca3}>
                {country.name.common}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Start date</span>
          <input
            type="date"
            value={form.startDate}
            onChange={this.changeHandler}
            name="startDate"
          />
        </label>
        <button
          onClick={this.commitHandler}
          disabled={!form.startDate || !form.countryCode}
        >
          OK
        </button>
        {this.props.handleRemove && (
          <button onClick={this.props.handleRemove}>X</button>
        )}
      </div>
    );
  }
}

export default Move;
