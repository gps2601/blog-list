const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/api/blogs', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog.toJSON())
    } catch(exception){
        response.status(400).json()
    }
})

blogsRouter.delete('/api/blogs/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {

    const body = request.body
    const blog = {
        ...body
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.status(204).json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter