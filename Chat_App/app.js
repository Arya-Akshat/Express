// 1. IMPORTS AND SETUP
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
// We create an HTTP server and pass the Express app to it.
const server = http.createServer(app);
// We then pass the HTTP server to Socket.io.
const io = socketIo(server);

const port = process.env.PORT || 3000;

// 2. SERVE STATIC FILES
// Express will serve the HTML and client-side JS from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// 3. SOCKET.IO CONNECTION HANDLING
// This block of code runs every time a new client connects to our server.
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // --- Handle "join" event ---
    // This listens for a 'join' event from a client.
    socket.on('join', (username) => {
        // Store the username on the socket object for later use.
        socket.username = username;
        // Broadcast to all OTHER clients that this user has joined.
        socket.broadcast.emit('message', {
            user: 'System',
            message: `${username} has joined the chat`,
            timestamp: new Date().toISOString()
        });
    });

    // --- Handle "message" event ---
    // This listens for a 'message' event from a client.
    socket.on('message', (data) => {
        // Broadcast the received message to ALL connected clients, including the sender.
        io.emit('message', {
            user: data.user,
            message: data.message,
            timestamp: new Date().toISOString()
        });
    });

    // --- Handle "disconnect" event ---
    // This is a built-in event that fires when a client closes their browser tab.
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        // If the user had set a username before disconnecting...
        if (socket.username) {
            // ...broadcast to all other clients that they have left.
            socket.broadcast.emit('message', {
                user: 'System',
                message: `${socket.username} has left the chat`,
                timestamp: new Date().toISOString()
            });
        }
    });
});

// 4. START THE SERVER
// We call listen on the `server` object, not the `app` object.
server.listen(port, () => {
    console.log(`Chat server running at http://localhost:${port}`);
});
