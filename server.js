const express = require('express');
const app = express();
const http = require('http').createServer(app);




const port = process.env.PORT || 3000;






http.listen(port, () => {
    console.log(`listening on port  ${port}`);

});


app.use(express.static(`${__dirname}/public`))


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

/* socket configuration */

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('socket connected');
    socket.on('message', (msg) => {
        console.log("Reciving msg Server ->", msg);

        socket.broadcast.emit('message', msg)
    })
})