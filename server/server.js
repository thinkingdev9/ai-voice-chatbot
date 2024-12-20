// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const dotenv = require('dotenv');
dotenv.config();
const chalk = require('chalk');
const cors = require('cors');

const port = process.env.SERVER_PROT || 8000;
const ip = process.env.SERVER_IP || 'localhost';

app.use(cors());
app.use(function (req, res, next) {
    req.io = io;
    next();
});

io.on('connection', (socket) => {
    console.log(chalk.green('The socket is connected'));
    console.log(socket);
});

server.listen(port, ip, function () {
    console.log(chalk.red(`server is running: ${ip}:${port}`));
});