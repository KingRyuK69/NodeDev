require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute');

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8000

app.use(express.json()) //json data CRUD
app.use(express.urlencoded({extended: false})) //form data

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('BlogPost it is')
})

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('DB Connected!')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });   
}).catch((error) => {
    console.log(error)
})
