import React from 'react';
import CalculateScore from './Components/CalculateScore';

// App invokes the CalculateScore function component and passes the student's
// details as props. React calls the component with these props and renders
// the returned JSX.
function App() {
  return (
    <div className="App">
      <CalculateScore name="Adnan" school="Cognizant Academy" total={450} goal={5} />
    </div>
  );
}

export default App;
