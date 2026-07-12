import React from 'react';

// LoginButton - stateless function component. It receives its click handler
// from the parent through props (props.onClick).
export function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

// LogoutButton - same idea, for logging out.
export function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}
