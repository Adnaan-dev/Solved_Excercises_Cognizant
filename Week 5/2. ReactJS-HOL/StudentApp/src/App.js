import React from 'react';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

// App composes the three child components together. Calling a component is
// done with JSX tag syntax: <Home />, <About />, <Contact />.
function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <Contact />
    </div>
  );
}

export default App;
