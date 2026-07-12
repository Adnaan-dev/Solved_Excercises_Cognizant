import React, { Component } from 'react';

// CurrencyConvertor
// Converts an amount of Indian Rupees to Euro when the Submit button is
// clicked. Shows:
//   - controlled inputs whose onChange handlers read the SYNTHETIC EVENT
//     (event.target.value) to keep state in sync
//   - a handleSubmit click handler that also receives the synthetic event and
//     calls event.preventDefault() to stop the default form submission/reload
class CurrencyConvertor extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, currency: '' };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Synthetic event -> read the typed value from event.target.value.
  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleCurrencyChange(event) {
    this.setState({ currency: event.target.value });
  }

  // Click event on the Submit button invokes handleSubmit, which performs the
  // rupees -> euro conversion and reports it.
  handleSubmit(event) {
    event.preventDefault();
    const converted = this.state.amount * 80;
    alert('Converting to Euro Amount is ' + converted);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 style={{ color: 'green' }}>Currency Convertor!!!</h1>
        <label>Amount: </label>
        <input
          type="text"
          value={this.state.amount}
          onChange={this.handleAmountChange}
        />
        <br />
        <label>Currency: </label>
        <input
          type="text"
          value={this.state.currency}
          onChange={this.handleCurrencyChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CurrencyConvertor;
