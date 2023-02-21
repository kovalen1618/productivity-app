// Server
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE']
    }
})

// To run server, type in CMD: npm start
// This is possible due to the "start" script within package.json
server.listen(3001, () => {
    console.log('SERVER IS RUNNING')
})