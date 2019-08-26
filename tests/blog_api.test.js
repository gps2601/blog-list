const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Lauren",
    "author": "SMith",
    "url": "www.bing.com",
    "likes": 1
  },
  {
    "title": "Geoff",
    "author": "SMith",
    "url": "www.google.com",
    "likes": 5
  }
]

beforeEach( async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns the right amount of blogs', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body.length).toBe(2)
})

afterAll(() => {
  mongoose.connection.close()
})