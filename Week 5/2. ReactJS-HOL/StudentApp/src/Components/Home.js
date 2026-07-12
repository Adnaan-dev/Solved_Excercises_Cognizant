import React, { Component } from 'react';

// Home is a CLASS component. A class component:
//   - extends React.Component
//   - can have a constructor (to initialise state / receive props)
//   - MUST implement a render() method that returns JSX
class Home extends Component {
  // The constructor runs first when the component is created.
  // It must call super(props) to pass props up to React.Component.
  // Here we use it to initialise the component's state.
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome to the Home page of Student Management Portal',
    };
  }

  // render() returns the JSX (virtual DOM) that React paints to the page.
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Home;
