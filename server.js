require('dotenv').config();
const http = require('http')
const app = require('./app/app')

require('./config/dbConnect')
const port = process.env.PORT || 3000



const server = http.createServer(app);

// Server 
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })