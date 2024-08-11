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
const users = []
io.on('connection', (socket)=>{
    socket.on("disconnect", ()=>{
        users.splice(users.indexOf(socket.user),1)
        updateUsers()
    })
    socket.on("message",(message)=>{
        io.emit("allMessage", message)
    })
    socket.on("login", (login)=>{
        const user = {username:login, userId:socket.id} 
        socket.user = user
        socket.emit("login", user)
        users.push(user)
        updateUsers()
    })
    function updateUsers(){
        io.emit("onlineUsers", users);
    }
})

server.listen(3001, () => {
    console.log("Server is running || Port 3001");
})