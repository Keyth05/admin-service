const WebSocket = require('ws');
const Admin = require('./model/admin');
require('dotenv').config();

let ws;

function connectWebSocket() {
    ws = new WebSocket(process.env.WEBSOCKET_URL);

    ws.on('open', () => {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({ event: 'subscribe', topic: 'check_admin' }));
    });

    ws.on('message', async (message) => {
        console.log('Message received:', message);

        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.topic === 'check_admin') {
                const email = parsedMessage.email;

                const admins = await Admin.findAll({ where: { email } });
                const isAdmin = admins.length > 0;

                ws.send(JSON.stringify({
                    topic: 'verificated_admin',
                    event: 'check',
                    email,
                    isAdmin
                }));
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Disconnected from WebSocket server. Reconnecting in 1 minute...');
        setTimeout(connectWebSocket, 6000); 
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        console.log('Reconnecting in 1 minute...');
        setTimeout(connectWebSocket, 60000); 
    });
}

connectWebSocket();
