import React from 'react';

// Two separate squads that we want to combine into one list.
const T20Players = ['First Player', 'Second Player', 'Third Player'];
const RanjiTrophyPlayers = ['Fourth Player', 'Fifth Player', 'Sixth Player'];

// The ES6 spread operator (...) expands both arrays into a brand-new array.
// This is the "merge" feature of ES6 — the two source arrays are left
// untouched and IndianPlayers holds all six names in order.
export const IndianPlayers = [...T20Players, ...RanjiTrophyPlayers];

// ListofIndianPlayers
// Renders the merged array with map(). Since the array holds plain strings,
// the arrow-function callback receives each name directly.
export function ListofIndianPlayers({ IndianPlayers }) {
  return (
    <div>
      {IndianPlayers.map((item) => {
        return (
          <div key={item}>
            <li>Mr. {item}</li>
          </div>
        );
      })}
    </div>
  );
}

export default ListofIndianPlayers;
