// require npm packages
require('dotenv').config()
require('express-async-errors')
const express = require('express')

// require created modules
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

// middleware for everything
const app = express()
app.use(express.json())

// home route (must be before middleware for products routes)
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

// middleware for products routes

app.use('/api/v1/products', productsRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)


// products routes

const port = process.env.PORT || 5000

const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()