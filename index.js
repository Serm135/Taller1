const express = require('express');
const app = express();

app.use(express.json())

const characters = require('./characters')
app.use('/personas',rutas1)
