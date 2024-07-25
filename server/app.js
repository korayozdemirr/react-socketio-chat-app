const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
});

io.on('connection', (socket)=>{
    console.log("a user connected");
    socket.on("disconnecting", (reason)=>{
        console.log(reason)
    })
    socket.on("message",(message)=>{
        io.emit("allMessage", message)
    })
})

server.listen(3001, () => {
    console.log("Server is running || Port 3001");
})