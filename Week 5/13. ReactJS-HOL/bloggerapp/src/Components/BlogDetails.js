import React from 'react';

// BlogItem
// An EXTRACTED component (from a list). Because it is rendered inside a map(),
// the KEY is placed on <BlogItem> in the parent, not here.
function BlogItem(props) {
  const blog = props.blog;
  return (
    <div>
      <h2>{blog.title}</h2>
      <h4>{blog.author}</h4>
      {/* Conditional rendering technique #2: LOGICAL && (short-circuit).
          Render the content paragraph only when content exists. */}
      {blog.content && <p>{blog.content}</p>}
    </div>
  );
}

// BlogDetails
// Conditional rendering technique #3: TERNARY operator (? :).
// If the list has items we render the mapped BlogItem components (with keys);
// otherwise we render a fallback message inline.
export function BlogDetails(props) {
  const blogs = props.blogs || [];

  return (
    <div className="v1">
      <h1>Blog Details</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
      ) : (
        <p>No blogs to show.</p>
      )}
    </div>
  );
}

export default BlogDetails;
