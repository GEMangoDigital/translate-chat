// User props
const user = {
    name: null,
    language: null,
    connected: false
}

// Connection props
const connection = {
    socket: null
}

// Get user-entered name
const getUserName = () => {
    const userName = document.getElementById('userName');
    return userName.value;
}

// Get user's selected language
const getUserLanguage = () => {
    const language = document.querySelector('input[name="language"]:checked').id;
    return language;
}

// Establish connection to Web Socket server
const connectToWebSocket = (port) => {
    /**
     * @todo connect to Joey's WSS {AFTER JOEY DEMO}
     */
    console.log('Connecting...');
    connection.socket = new WebSocket(`ws://localhost:${port}`);

    // Handle connection established
    connection.socket.onopen = (e) => {
        console.log('Connected!');
        console.table(user);
        user.connected = true;

        // Send user-joined message
        connection.socket.send(JSON.stringify({
            joined: true,
            sender: user.name,
            language: user.language
        }));
    }

    // Handle receiving message
    connection.socket.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        console.log('Message received', parsedData);
        renderMessage(parsedData.sender, parsedData.message);
    }

    // Handle closed connection
    connection.socket.onclose = (e) => {
        user.connected = false;

        /**
         * @todo Graceful disconnection
         */
    }
}

// Join chat room at given port form server
const joinChatRoom = () => {
    const hostName = 'http://localhost:9000/api';
    fetch(`${hostName}/join`)
    .then(res => res.json())
    .then(res => {
        const webSocketPort = res.port;
        connectToWebSocket(webSocketPort);
    });
}

// Handle Pre-chat form submit
const preChatForm = document.getElementById('preChatForm');
preChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Set user props
    user.name = getUserName();
    user.language = getUserLanguage();

    /**
     * @todo Join chat room
     */
    console.log('Joining...');
    joinChatRoom();
})

// Get user-entered message
const getUserMessage = () => {
    const userMessage = document.getElementById('userMessage');
    return userMessage.value;
}

// Display message in view
const renderMessage = (sender, message) => {
    const messagesList = document.getElementById('messages');
    const messageNode = document.createElement('li');
    const textNode = document.createTextNode(`${sender}: ${message}`);
    messageNode.appendChild(textNode);
    messagesList.appendChild(messageNode);
}

// Handle sending messages
const sendMessage = (message) => {
    renderMessage(user.name, message);

    /**
     * @todo send message to socket server
     */
    connection.socket.send(JSON.stringify({
        sender: user.name,
        message: message
    }));
}

// Handle new message form submit
const userMessageForm = document.getElementById('userMessageForm');
userMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageToSend = getUserMessage();
    sendMessage(messageToSend);
});
