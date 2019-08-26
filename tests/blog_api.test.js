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

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns the right amount of blogs', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body.length).toBe(2)
})

test('has an _id identifier on blogs', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body[0].id).toBeDefined();
})

test('if no likes property, default will be 0', async () => {
  likelessBlog = {
    "title": "No Likes",
    "author": "LIkeless",
    "url": "www.ask.com"
  }

  const savedBlog = await new Blog(likelessBlog).save()

  expect(savedBlog.likes).toBe(0)
})

test('can add a blog', async () => {
  newBlog =
    {
      "title": "newblog",
      "author": "saveme",
      "url": "www.please.com",
      "likes": 100
    }
  await new Blog(newBlog).save()
  
  const blogsInDb = await Blog.find({})

  expect(blogsInDb.length).toBe(initialBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})