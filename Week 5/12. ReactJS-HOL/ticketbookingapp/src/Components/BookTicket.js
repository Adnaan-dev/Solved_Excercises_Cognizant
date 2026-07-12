import React from 'react';

// BookTicket
// PREVENTING A COMPONENT FROM RENDERING.
// Only a logged-in user may book a ticket. When `isLoggedIn` is false we
// return `null`, so React renders nothing for this component at all — the
// booking UI simply does not appear for a guest.
export function BookTicket(props) {
  if (!props.isLoggedIn) {
    return null; // renders nothing for guests
  }

  return (
    <div>
      <h2>Book Your Ticket</h2>
      <p>You are logged in, so you can book a ticket.</p>
      <button onClick={() => alert('Ticket booked successfully!')}>
        Book Ticket
      </button>
    </div>
  );
}

export default BookTicket;
