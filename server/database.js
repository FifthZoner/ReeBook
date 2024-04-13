const mongoose = require('mongoose');
const schemas = require('./schemas.js');

const uri = process.env.MONGO_STRING

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("ReeBook backend is now successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await mongoose.disconnect();
    }
}
run().catch(console.dir);

const UserEntry = mongoose.model('users', schemas.userSchema);

module.exports = {UserEntry};


const newUser = new UserEntry({"credentials.email" : "test email", "credentials.nickname" : "test nick", "credentials.passwordHash" : "test password"});
newUser.save();