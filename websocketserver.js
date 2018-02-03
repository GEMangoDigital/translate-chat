'use strict'

const WebSocket = require('ws');
const websocketServer = new WebSocket.Server({ port: 8080 });

websocketServer.on('connection', function connection(socket) {

    socket.on('message', function incoming(data) {
        send(socket, data);
    });

    socket.on('close', function close() {
        console.log('bye bye now.')
    });
});

const send = (socket, data) => {
    // Broadcast to everyone else.
    websocketServer.clients.forEach(function each(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}