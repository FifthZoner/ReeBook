const express = require('express')
const cors = require('cors');


const app = express()

const serverPort = 5000
const clientPort = 3000

const corsOptions = {
  origin: `http://localhost:${clientPort}`,
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(serverPort, () => {
  console.log(`http://localhost:${serverPort}`)
})

require('./routing.js')(app);

app.get('/api', (req, res) => res.send('api test'));

