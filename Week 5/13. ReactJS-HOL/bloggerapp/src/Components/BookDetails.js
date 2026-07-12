import React from 'react';

// BookDetails
// Conditional rendering technique #1: ELEMENT VARIABLE.
// We build the list into the `bookdet` variable first (mirrors the lab hint),
// then decide what to show. If there are no books we render a fallback message
// instead — this is an if/else returning different element variables.
//
// List rendering: props.books.map(...) with a unique key={book.id}.
export function BookDetails(props) {
  const books = props.books || [];

  let bookdet;
  if (books.length === 0) {
    bookdet = <p>No books available.</p>;
  } else {
    bookdet = (
      <ul>
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.bname}</h3>
            <h4>{book.price}</h4>
          </div>
        ))}
      </ul>
    );
  }

  return (
    <div className="st2">
      <h1>Book Details</h1>
      {bookdet}
    </div>
  );
}

export default BookDetails;
