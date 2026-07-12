import React from 'react';
import '../Stylesheets/mystyle.css';

// CalculateScore is a FUNCTION component. It receives data through `props`
// (Name, School, Total and goal) and returns JSX describing the UI.
//
// The average score is calculated as Total / goal (total marks divided by the
// number of subjects/goals). We guard against division by zero.
function CalculateScore(props) {
  const { name, school, total, goal } = props;
  const average = goal ? (total / goal).toFixed(2) : 0;

  return (
    <div className="scorecard">
      <h1 className="title">Student Score Card</h1>
      <p className="detail">
        <span className="label">Name: </span>
        {name}
      </p>
      <p className="detail">
        <span className="label">School: </span>
        {school}
      </p>
      <p className="detail">
        <span className="label">Total: </span>
        {total}
      </p>
      <p className="detail">
        <span className="label">Goal: </span>
        {goal}
      </p>
      <div className="average">Average Score: {average}</div>
    </div>
  );
}

export default CalculateScore;
