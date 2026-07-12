import React from 'react';

// CourseDetails
// Conditional rendering technique #4: PREVENT A COMPONENT FROM RENDERING by
// returning null early. If the `show` prop is false, the whole component
// renders nothing at all.
//
// Conditional rendering technique #5: an IIFE with a switch statement inside
// JSX, used per-course to render a small tag based on the course name.
export function CourseDetails(props) {
  const courses = props.courses || [];

  // Prevent rendering entirely for a guest / when hidden.
  if (props.show === false) {
    return null;
  }

  return (
    <div className="mystyle1">
      <h1>Course Details</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.cname}</h2>
          {(() => {
            switch (course.cname) {
              case 'Angular':
                return <p>{course.date}</p>;
              case 'React':
                return <p>{course.date}</p>;
              default:
                return <p>{course.date}</p>;
            }
          })()}
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;
