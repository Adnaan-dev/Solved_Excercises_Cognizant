import React from 'react';
import CohortDetails from './Components/CohortDetails';
import cohorts from './cohortData';

// App renders the "Cohorts Details" dashboard: one CohortDetails card per cohort.
function App() {
  return (
    <div className="App">
      <h1>Cohorts Details</h1>
      {cohorts.map((cohort) => (
        <CohortDetails key={cohort.id} cohort={cohort} />
      ))}
    </div>
  );
}

export default App;
