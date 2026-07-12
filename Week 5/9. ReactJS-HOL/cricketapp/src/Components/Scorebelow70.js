import React from 'react';

// Scorebelow70
// Filters the players whose score is 70 or below. The exercise hint builds a
// `players70` array by pushing matching items inside a map() callback; the
// idiomatic ES6 way to do the same thing is Array.prototype.filter() with an
// arrow-function predicate. Both are shown below — filter() is used for the
// actual rendering.
export function Scorebelow70({ players }) {
  // Arrow function predicate: returns true when the player's score <= 70.
  const players70 = players.filter((item) => item.score <= 70);

  return (
    <div>
      {players70.map((item) => {
        return (
          <div key={item.name}>
            <li>
              Mr. {item.name}
              <span> {item.score}</span>
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default Scorebelow70;
