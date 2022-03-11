const express = require('express');
const app = express();

app.use(express.json())

const missions = require('./missions')
const missions_objectives = require('./missions_objectives')
app.use('/missions',missions)
app.use('/missions_objectives', missions_objectives)

app.listen(8080);