var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});
var users = [
    {name: 'user1', id: 1},
    {name: 'user2', id: 2},
    {name: 'user3', id: 3},
    {name: 'user4', id: 4}
];
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('get_rating', function(data){
        console.log('get_rating: ' + data);
        io.emit('rating', data);
    });
    socket.on('set_rating', function(data){
        console.log('set_rating: ' + data);
        users.push(data);
        io.emit('rating', data);
    });
    socket.on('register', function(data){
        console.log('register: ' + data);
        io.emit('register', data);
    });
    socket.on('get_users', function(data){
        console.log('get_users: ' + data);
        io.emit('req_users', users);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});