import { uri } from "MongoString/MongoString.js"

const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(cors());
const port = 5000

app.get("/api",(req, res) =>{

  res.json({"test": ["api"]});

})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.get('/api', (req, res) => res.send('api test'));

const uri = "mongodb+srv://szyfzjablonski:WGKpI7la2AEKt2jB@reebook.qpahs0e.mongodb.net/?retryWrites=true&w=majority&appName=ReeBook";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("ReeBook backend is now successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);