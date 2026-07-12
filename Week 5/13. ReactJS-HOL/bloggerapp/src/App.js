import React from 'react';
import './App.css';
import BookDetails from './Components/BookDetails';
import BlogDetails from './Components/BlogDetails';
import CourseDetails from './Components/CourseDetails';
import { books, blogs, courses } from './data';

// App
// Lays out the three list components in three columns separated by green
// vertical lines (see App.css). Each child receives its data as a prop and
// applies its own style of conditional rendering.
function App() {
  return (
    <div className="App">
      <div className="column">
        {/* show={true} => CourseDetails renders; set to false to prevent it */}
        <CourseDetails courses={courses} show={true} />
      </div>

      <div className="column">
        <BookDetails books={books} />
      </div>

      <div className="column">
        <BlogDetails blogs={blogs} />
      </div>
    </div>
  );
}

export default App;
