const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json()) //json data CRUD
app.use(express.urlencoded({extended: false})) //form data

//routes
app.get('/', (req, res) => {
  res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('BlogPost it is')
  })

app.get('/products', async(req, res) => {
  try {
      const products = await Product.find({})
      res.status(200).json(products);
    
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

app.post('/products', async(req, res) => {
  try {
      const product = await Product.create(req.body)
      res.status(200).json(product);
    
  } catch (error) {
      console.log(error.message)
      res.status(500).json({message: error.message})
  }
})

app.get('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findById(id)
      res.status(200).json(product);
    
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// update a prod
app.put('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can't find the prod
    if(!product){
      return res.status(404).json({message: `Product can't be found with ID ${id}`})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//delete a prod
app.delete('/products/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    // we can't find the prod
    if(!product){
      return res.status(404).json({message: `my product can't be found with ID ${id}`})
    }
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://sohomneogi:12345admin@nodeapi.5njc1aa.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('DB Connected!')
    app.listen(3000, ()=> {
        console.log("Node API app is running on port 3000")
    });   
}).catch((error) => {
    console.log(error)
})
