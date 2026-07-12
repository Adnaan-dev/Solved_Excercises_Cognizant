import React from 'react';

// OfficeSpace
// Demonstrates the core JSX ideas from this lab:
//  - JSX ELEMENTS         : the returned <div>/<h1>/<h3> tree
//  - ATTRIBUTES           : <img src=... width=... height=... alt=... />
//  - JS EXPRESSIONS IN JSX: values inside { } such as {item.Name}
//  - LOOPING              : offices.map(...) renders one card per object
//  - CONDITIONAL / INLINE : the Rent colour is chosen at runtime
//
// Note on React.createElement:
//   JSX is only syntactic sugar. The heading below,
//     <h1>{element} , at Affordable Range</h1>
//   is compiled by Babel down to:
//     React.createElement('h1', null, element, ' , at Affordable Range')
//   So writing JSX and writing React.createElement() produce the same nodes.

// The path to the office image lives in the /public folder, so it is served
// from the site root. `src` is a normal JSX attribute.
const sr = '/office.svg';

// A single office object with the details to display.
const singleOffice = { Name: 'DBS', Rent: 50000, Address: 'Chennai' };

// A list of office objects — we loop through this with map() to show more data.
const offices = [
  { Name: 'DBS', Rent: 50000, Address: 'Chennai' },
  { Name: 'WeWork', Rent: 72000, Address: 'Bangalore' },
  { Name: 'Regus', Rent: 45000, Address: 'Hyderabad' },
  { Name: 'Awfis', Rent: 90000, Address: 'Mumbai' },
];

// Helper: pick the CSS class name based on the rent value.
// Rent <= 60000 -> "textRed", otherwise -> "textGreen".
function rentColorClass(ItemName) {
  let colors = [];
  if (ItemName.Rent <= 60000) {
    colors.push('textRed');
  } else {
    colors.push('textGreen');
  }
  return colors[0];
}

export function OfficeSpace() {
  // A JSX element stored in a variable, then embedded as an expression below.
  const element = 'Office Space';

  return (
    <div className="App">
      <h1>{element} , at Affordable Range</h1>

      {/* Loop through the list of office objects */}
      {offices.map((ItemName) => {
        return (
          <div className="office-card" key={ItemName.Name + ItemName.Address}>
            <img src={sr} width="25%" height="25%" alt="Office Space" />
            <h1>Name: {ItemName.Name}</h1>
            {/* Conditional inline CSS: red when Rent <= 60000, green otherwise */}
            <h3 className={rentColorClass(ItemName)}>
              Rent: Rs. {ItemName.Rent}
            </h3>
            <h3>Address: {ItemName.Address}</h3>
          </div>
        );
      })}
    </div>
  );
}

// Also exported so it can be reused/tested directly if needed.
export { singleOffice };
export default OfficeSpace;
