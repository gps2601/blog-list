const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://gps2601:test123@fieldnote-3fejg.mongodb.net/bloglist?retryWrites=true&w=majority'
console.log('connecting to  ', config.MONGODB_URI)

mongoose.connect(mongoUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((error) => {
        console.log('error connecting to mongodb', error.message)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(blogsRouter)

module.exports = app
