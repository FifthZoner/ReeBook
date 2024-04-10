const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('It works (now 😖)'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


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