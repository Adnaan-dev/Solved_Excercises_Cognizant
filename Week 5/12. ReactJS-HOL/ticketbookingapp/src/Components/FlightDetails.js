import React from 'react';

// FlightDetails
// Flight information that ANY user (guest or logged in) is allowed to browse.
const flights = [
  { id: 'AI101', from: 'Chennai', to: 'Delhi', time: '08:30', fare: 5400 },
  { id: '6E223', from: 'Mumbai', to: 'Bangalore', time: '11:15', fare: 3200 },
  { id: 'UK811', from: 'Kolkata', to: 'Hyderabad', time: '14:45', fare: 4100 },
  { id: 'SG455', from: 'Pune', to: 'Goa', time: '18:00', fare: 2800 },
];

export function FlightDetails() {
  return (
    <div>
      <h2>Available Flights</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Fare (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.from}</td>
              <td>{f.to}</td>
              <td>{f.time}</td>
              <td>{f.fare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightDetails;
