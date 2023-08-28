
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:KTvs2QSG9Y9rzC7Y@mealplanner.71rx5ux.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Meal = require('./models/meal');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
const ShoppingItem = require('./models/shoppingItem');

// Get all shopping items
app.get('/shopping-items', async (req, res) => {
  const items = await ShoppingItem.find();
  res.json(items);
});

// Add a new item
app.post('/shopping-items', async (req, res) => {
  const newItem = new ShoppingItem({
    name: req.body.name,
    quantity: req.body.quantity
  });
  await newItem.save();
  res.json({ message: "Item added!" });
});

// Update an item
app.put('/shopping-items/:id', async (req, res) => {
  const updatedItem = await ShoppingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// Delete an item
app.delete('/shopping-items/:id', async (req, res) => {
  await ShoppingItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted!" });
});

app.get('/meals/:day', async (req, res) => {
    const meal = await Meal.findOne({ day: req.params.day });
    res.json(meal);
  });
  
  app.post('/meals', async (req, res) => {
    const newMeal = new Meal({
      day: req.body.day,
      mealDescription: req.body.mealDescription,
      photo: req.body.photo
    });
    await newMeal.save();
    res.json({ message: "Meal saved!" });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
