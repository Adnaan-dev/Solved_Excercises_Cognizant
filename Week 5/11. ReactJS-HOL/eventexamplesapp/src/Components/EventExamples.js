import React, { Component } from 'react';

// EventExamples
// A CLASS component chosen deliberately so we can demonstrate:
//   - the `this` keyword and constructor BINDING of event handlers
//   - React event NAMING CONVENTION: camelCase attributes (onClick, not onclick)
//     that take a function reference {this.handler} (not a "handler()" string)
//   - a single event invoking MULTIPLE methods
//   - passing an ARGUMENT to a handler
//   - the SYNTHETIC EVENT object React passes to every handler
class EventExamples extends Component {
  constructor(props) {
    super(props);
    // Component state: the counter value.
    this.state = { counter: 5 };

    // Binding `this` so that inside each method `this` refers to the component
    // instance. Without this, `this` would be undefined when the handler runs.
    this.handleIncrement = this.handleIncrement.bind(this);
    this.sayHello = this.sayHello.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.sayWelcome = this.sayWelcome.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // (a) increment the counter value
  handleIncrement() {
    this.setState({ counter: this.state.counter + 1 });
  }

  // (b) say Hello followed by a static message
  sayHello() {
    alert('Hello! Member!');
  }

  // Decrement button — decreases the counter.
  handleDecrement() {
    this.setState({ counter: this.state.counter - 1 });
  }

  // Handler that accepts an ARGUMENT. Called as () => this.sayWelcome('welcome')
  sayWelcome(msg) {
    alert(msg);
  }

  // SYNTHETIC EVENT handler. React always passes a SyntheticEvent (a cross-
  // browser wrapper around the native DOM event) as the first argument.
  handleClick(e) {
    // e.type here is "click" — proof we received the synthetic event object.
    alert('I was clicked');
    console.log('Synthetic event type:', e.type);
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>

        {/* One click invokes MULTIPLE methods: increment + sayHello. */}
        <button
          onClick={() => {
            this.handleIncrement();
            this.sayHello();
          }}
        >
          Increment
        </button>
        <br />

        <button onClick={this.handleDecrement}>Decrement</button>
        <br />

        {/* Passing an argument requires wrapping in an arrow function,
            otherwise it would run immediately during render. */}
        <button onClick={() => this.sayWelcome('welcome')}>Say welcome</button>
        <br />

        {/* Synthetic event: handler reference receives the event object. */}
        <button onClick={this.handleClick}>Click on me</button>
      </div>
    );
  }
}

export default EventExamples;
