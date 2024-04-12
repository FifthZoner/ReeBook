const dotenv = require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors');


const app = express()
app.use(cors());
const port = 5000

app.use(session({secret: "whatdoIwriteherepleasetellmetutorials", resave: true, saveUninitialized: true}))

require('./auth.js')(app);
require('./routing.js')(app);



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.get('/api', (req, res) => res.send('api test'));

