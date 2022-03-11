const express = require('express');
const app = express();

app.use(express.json())

const missions = require('./missions')
const missions_objectives = require('./missions_objectives')
const players = require('./players')
app.use('/missions',missions)
app.use('/missions_objectives', missions_objectives)
app.use('/players', players)

app.listen(8080);