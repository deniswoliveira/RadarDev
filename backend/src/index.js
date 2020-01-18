const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setWebSocket(server);

mongoose.connect('mongodb+srv://denis:denis@cluster0-ujjak.mongodb.net/devraddb?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(cors())
app.use(express.json());
app.use(routes);


server.listen(3333);

