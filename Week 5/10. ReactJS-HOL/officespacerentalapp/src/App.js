import React from 'react';
import './App.css';
import OfficeSpace from './Components/OfficeSpace';

// App renders the OfficeSpace component, which produces the JSX element tree
// that index.js mounts into the DOM.
function App() {
  return (
    <div>
      <OfficeSpace />
    </div>
  );
}

export default App;
