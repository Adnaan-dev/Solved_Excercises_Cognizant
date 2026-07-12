import React from 'react';

// ListofPlayers
// Receives the `players` array as a prop and renders every player using the
// ES6 Array.prototype.map() method. map() transforms each element of the
// array into a piece of JSX. The arrow function `(item) => { ... }` is the
// callback map() runs for each player.
export function ListofPlayers({ players }) {
  return (
    <div>
      {players.map((item) => {
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

export default ListofPlayers;
