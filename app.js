var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
var roomno = 1;
io.on('connection', function(client) {  
    console.log('Client connected...');
     if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1);
     client.join("room-"+roomno);
     io.sockets.in("room-"+roomno).emit('connectToRoom', "You are listening to SNS Messages")
   
     let body = ''; 
     app.post('/', function (req, res) {
        if(req.method == "POST"){
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              console.log(
                  body
              );
              res.end("200");
          });
         //var str = (body.split(",")[3]);
         io.sockets.in("room-"+roomno).emit('connectToRoom', body);
         console.log(req.method + " || " + req.rawHeaders + " || " + req.rawTrailers);
          } else if(req.method == "GET") {
                  res.writeHead(200, {'Content-Type': 'text/html'});  
          } 
    });
 });
server.listen(process.env.PORT || 4200);
  