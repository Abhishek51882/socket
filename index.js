const express = require('express');
const app=express();
const path = require('path');




const port=4002;

const http=require('http').Server(app);
const io=require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));

});
let users=0;
io.on("connection", function(socket){


    console.log("connection established");
    users++;
    socket.emit("msg","Welcome back");
    socket.broadcast.emit("msg",`${users} are active`);
    socket.on('disconnect',function(){
                users--;
                socket.broadcast.emit("abhi",`${users} are active`);
                console.log("disconnect");
            })





            // receivers message from client
    // socket.on("clientEvent",function(data){
    //     console.log(data);
    // })
   
    //  socket.emit("myEvent","hello abhishek");

})

//broadcast to all clients
// let users=0;
// io.on('connection',function(socket){
//     console.log("A user connected");
//     users++;
//     socket.emit("abhi","welcome back");
//     socket.broadcast.emit("abhi",`${users} are active`);
   
    
//     socket.on('disconnect',function(){
//         users--;
//         socket.broadcast.emit("abhi",`${users} are active`);
//         console.log("disconnect");
//     })
// })
http.listen(port,function(){
    console.log(`listening on http://localhost:${port}`);
})