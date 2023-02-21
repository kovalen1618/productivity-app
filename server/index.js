// Server
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Handling json-server
const jsonServer = require('json-server');
const db = require('./data/db.json');

// Use json.server to serve db.json
app.use('/api', jsonServer.router(db));

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE']
    }
})

// // Simple API route that returns JSON data
// app.get('/api/data', (req, res) => {
//   const data = {
//     message: 'Hello, world!',
//     timestamp: new Date()
//   };
//   res.json(data);
// });

// To run server, type in CMD: npm start
// This is possible due to the "start" script within package.json
server.listen(3001, () => {
    console.log('SERVER IS RUNNING')
})