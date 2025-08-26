// Establish a connection to the server.
const socket = io();

// Get DOM elements
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const usernameContainer = document.getElementById('username-container');
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('form');
const msgInput = document.getElementById('msg');
const chatUl = document.getElementById('chat');

let currentUsername = '';

// --- Event Listener for Joining Chat ---
const joinChat = () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUsername = username;
        // Emit a "join" event to the server with the username.
        socket.emit('join', username);
        
        // Switch views
        usernameContainer.style.display = 'none';
        chatWindow.style.display = 'flex';
        chatForm.style.display = 'flex';
        msgInput.focus();
    }
};

joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinChat();
    }
});


// --- Event Listener for Sending a Message ---
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    const message = msgInput.value.trim();
    if (message) {
        // Emit a "message" event to the server.
        socket.emit('message', { user: currentUsername, message: message });
        msgInput.value = ''; // Clear the input field
    }
});

// --- Event Listener for Receiving a Message ---
// This listens for "message" events coming from the server.
socket.on('message', (data) => {
    const li = document.createElement('li');
    
    // Add a user label for non-system messages
    if (data.user !== 'System') {
        const userSpan = document.createElement('span');
        userSpan.className = 'message-user';
        userSpan.textContent = data.user;
        li.appendChild(userSpan);
    }

    const messageSpan = document.createElement('span');
    messageSpan.textContent = data.message;
    li.appendChild(messageSpan);

    // Apply different styles based on the sender
    if (data.user === 'System') {
        li.className = 'message-system';
    } else if (data.user === currentUsername) {
        li.className = 'message-own';
    } else {
        li.className = 'message-other';
    }

    chatUl.prepend(li); // Prepend to keep latest messages at the bottom
});
