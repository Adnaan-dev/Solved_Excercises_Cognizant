import React from 'react';
// Import the CSS Module. Its class names are exposed as properties of `styles`.
import styles from './CohortDetails.module.css';

// CohortDetails renders a single cohort card.
// - The container div uses the `box` class from the CSS Module (className).
// - The <h3> colour is set with an inline `style` property: green when the
//   cohort status is "ongoing", blue otherwise.
function CohortDetails(props) {
  const { cohort } = props;

  const isOngoing = cohort.status.toLowerCase() === 'ongoing';
  const headingStyle = { color: isOngoing ? 'green' : 'blue' };

  return (
    <div className={styles.box}>
      <h3 style={headingStyle}>{cohort.name}</h3>
      <dl>
        <dt>Started On</dt>
        <dd>{cohort.startedOn}</dd>
        <dt>Current Status</dt>
        <dd>{cohort.status}</dd>
        <dt>Coach</dt>
        <dd>{cohort.coach}</dd>
        <dt>Trainer</dt>
        <dd>{cohort.trainer}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;
