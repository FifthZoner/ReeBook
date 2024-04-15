const express = require('express')
const cors = require('cors');


const app = express()
app.use(cors());
const port = 5000



require('./routing.js')(app);



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.get('/api', (req, res) => res.send('api test'));

