const express = require('express')
const router  = express.Router()

router.get('/', function(req,res,next){
  let socket_id = [];
  const io = req.app.get('socketio'); // 从app里拿到

  console.log('web socket')
  io.on('connection', socket => {
     socket_id.push(socket.id);
     if (socket_id[0] === socket.id) {
       // remove the connection listener for any subsequent
       // connections with the same ID
       io.removeAllListeners('connection');
     }
     socket.on('hello message', msg => {
       console.log('just got: ', msg);
       socket.emit('chat message', 'hi from server');

     })
  });
})

module.exports = router
