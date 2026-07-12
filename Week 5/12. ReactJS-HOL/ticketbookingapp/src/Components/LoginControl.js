import React, { Component } from 'react';
import { Greeting } from './Greeting';
import { LoginButton, LogoutButton } from './Buttons';
import FlightDetails from './FlightDetails';
import BookTicket from './BookTicket';

// LoginControl
// A class component that owns the isLoggedIn state and switches the whole page
// between the guest view and the logged-in (user) view.
class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    // ELEMENT VARIABLE:
    // We store a React element in the `button` variable and decide its value
    // conditionally. This keeps the JSX below clean — we just drop {button}
    // wherever we want it.
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        {/* Greeting chooses UserGreeting vs GuestGreeting internally */}
        <Greeting isLoggedIn={isLoggedIn} />
        {button}

        <hr />

        {/* Flight details are browsable by everyone (guest + user) */}
        <FlightDetails />

        {/* BookTicket returns null for guests, so it renders nothing until
            the user logs in */}
        <BookTicket isLoggedIn={isLoggedIn} />
      </div>
    );
  }
}

export default LoginControl;
