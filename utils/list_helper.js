const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesReducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(likesReducer, 0)
}

const mostLiked = (blogs) => {
    return blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
}

const authorWithMostBlogs = (blogs) => {
    let bloggers = _(blogs)
        .groupBy(x => x.author)
        .map((value, key) => (
            {
                author: key,
                blogs: _sum(value)
            }
        )).value()
    console.log(bloggers)
    return null
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked,
    authorWithMostBlogs
}