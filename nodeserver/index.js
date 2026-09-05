//Node server which will handle socket io connections
// const io = require('socket.io')(8000)
const io = require('socket.io')({
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
});
  
const users = {};

io.on('connection', socket =>{
    
    //if any new user joins,let all the other users know!!
    socket.on('new-user-joined', name =>{
        //console.log("New user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //send a user's message to all the other users 
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id] })
    });

    //if someones leaves the server,notify all the other users
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
io.listen(8000);