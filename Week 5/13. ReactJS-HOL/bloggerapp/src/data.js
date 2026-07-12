// Central data module for the Blogger App.
// Each array is rendered later with the map() function + a unique `key`.

// Books (matches the lab hint exactly).
export const books = [
  { id: 101, bname: 'Master React', price: 670 },
  { id: 102, bname: 'Deep Dive into Angular 11', price: 800 },
  { id: 103, bname: 'Mongo Essentials', price: 450 },
];

// Blogs: each has a title, author and content.
export const blogs = [
  {
    id: 1,
    title: 'React Learning',
    author: 'Stephen Biz',
    content: 'Welcome to learning React!',
  },
  {
    id: 2,
    title: 'Installation',
    author: 'Schewzdenier',
    content: 'You can install React from npm.',
  },
];

// Courses: each has a name and a date.
export const courses = [
  { id: 'c1', cname: 'Angular', date: '4/5/2021' },
  { id: 'c2', cname: 'React', date: '6/3/20201' },
];
