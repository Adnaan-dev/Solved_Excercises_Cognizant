import React from 'react';

// The Indian team squad. The odd/even split below is done purely with ES6
// array destructuring — no loops, no index math.
export const IndianTeam = [
  'Sachin1',
  'Dhoni2',
  'Virat3',
  'Rohit4',
  'Yuvaraj5',
  'Raina6',
];

// OddPlayers
// Array destructuring with "holes": the commas skip the positions we don't
// want. [first, , third, , fifth] grabs indexes 0, 2 and 4 (the 1st, 3rd and
// 5th players) and ignores 1 and 3.
export function OddPlayers([first, , third, , fifth]) {
  return (
    <div>
      <li> First : {first} </li>
      <li> Third : {third} </li>
      <li> Fifth : {fifth}</li>
    </div>
  );
}

// EvenPlayers
// Same technique, but the leading comma skips index 0 so we pick indexes
// 1, 3 and 5 (the 2nd, 4th and 6th players).
export function EvenPlayers([, second, , fourth, , sixth]) {
  return (
    <div>
      <li> Second : {second} </li>
      <li> Fourth : {fourth} </li>
      <li> Sixth : {sixth}</li>
    </div>
  );
}
