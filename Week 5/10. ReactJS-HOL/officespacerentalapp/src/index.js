import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Render JSX to the DOM: createRoot targets the <div id="root"> in index.html
// and render() mounts the <App /> element tree into it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
