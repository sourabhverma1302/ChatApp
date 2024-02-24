import express, { Request } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { WebSocket, WebSocketServer } from 'ws';
import Router from './router';
import url from 'url';
import chats from './src/models/chatSchema';
import { updateChat } from './src/controllers/updateChat';
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: ['*'],
    credentials: true
}
app.use(cors(corsOptions));
mongoose.connect('mongodb+srv://vermasourabh512:Sourabh%4013@cluster0.bm7g5yb.mongodb.net/')
    .then(() => { console.log("connected to db") });
app.use(Router);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
var users: { phoneNumber: string, ws: WebSocket }[] = [];

wss.on('connection', async (ws: WebSocket, req: Request) => {
    console.log("Connected WebSocket Server");
    const uri = url.parse(req.url, true);
    const { phoneNumber } = uri.query;
    console.log("number", phoneNumber);
    if (phoneNumber) {
        users.push({ phoneNumber: phoneNumber?.toString(), ws });
    };
    console.log("users backend", users);
    ws.on('message', async (message: any) => {
        console.log("In on msg backend");
        const mymessage = JSON.parse(message);
        console.log("msg", mymessage);
        await updateChat(mymessage.to, mymessage.from, mymessage.message);
        users.forEach((item) => {
            if (item.phoneNumber === mymessage?.to) {
                item.ws.send(JSON.stringify(mymessage));
            }
        })
    });
    ws.on('close', () => {
        console.log("Connection Closed");
        users = users.filter((user) => user.ws !== ws);
    });
})

server.listen(3003, () => {
    console.log("Connected");
})
