import React from 'react';

// UserGreeting - shown to a logged-in user.
export function UserGreeting() {
  return <h1>Welcome back</h1>;
}

// GuestGreeting - shown to a guest (not logged in).
export function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

// Greeting - CONDITIONAL RENDERING.
// It reads the isLoggedIn prop and returns a different component for each
// state. This is a plain JavaScript `if` deciding which element to return.
export function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export default Greeting;
