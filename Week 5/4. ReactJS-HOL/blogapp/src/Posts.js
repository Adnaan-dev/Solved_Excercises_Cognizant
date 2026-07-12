import React, { Component } from 'react';
import Post from './Post';

// Posts is a CLASS-BASED component that demonstrates the component life cycle:
//   constructor()        -> set up initial state
//   componentDidMount()  -> runs once after the first render (ideal for data fetch)
//   componentDidCatch()  -> catches errors thrown while rendering child components
//   render()             -> produces the UI (runs on mount and on every state change)
class Posts extends Component {
  // 1. MOUNTING - the constructor initialises the component's state with an
  //    empty list of posts.
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasError: false,
    };
  }

  // Uses the Fetch API to retrieve posts, converts each item into a Post
  // instance, and stores them in state (which triggers a re-render).
  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const posts = data.map(
          (p) => new Post(p.userId, p.id, p.title, p.body)
        );
        this.setState({ posts });
      })
      .catch((error) => {
        // Network / fetch errors are handled here (componentDidCatch only
        // catches errors thrown during rendering of child components).
        alert('Error while loading posts: ' + error.message);
      });
  }

  // 2. componentDidMount() runs right after the component is first rendered.
  //    This is the recommended place to start data fetching.
  componentDidMount() {
    this.loadPosts();
  }

  // 3. componentDidCatch() is a life cycle hook that catches errors thrown by
  //    child components during rendering and reports them as an alert.
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    alert('An error occurred in the component: ' + error.toString());
  }

  // 4. render() displays the title (heading) and body (paragraph) of each post.
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while displaying the posts.</h2>;
    }

    return (
      <div>
        <h1>Blog Posts</h1>
        {this.state.posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
