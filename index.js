const express = require("express");
const WebSocket = require("ws");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
    console.log("New client coming", ws);
    ws.send("Welcome to websocket server");
    ws.on("message", function incoming(message) {
        console.log("receive: %s", message);
        // ws.send(`I receive ${message} from you`);
        wss.clients.forEach(client => {
            if(client !== ws && client.readyState === WebSocket.OPEN) // not broadcasting to the sender itself
            {
                client.send("Oh no")
            }
        })   
    });
});

app.get("/", (req, res) => {
    res.send("alo");
});

server.listen(2000, () => {
    console.log("Server listen");
});
