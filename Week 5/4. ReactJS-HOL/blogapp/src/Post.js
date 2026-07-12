// Post is a plain JavaScript class that models a single blog post.
// (This is NOT a React component - it is a simple data/model class, which
//  highlights the difference between a JS class and a React component.)
class Post {
  constructor(userId, id, title, body) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

export default Post;
