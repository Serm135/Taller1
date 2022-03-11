const express = require('express');
const app = express();

app.use(express.json())

const missions = require('./missions')
const missions_objectives = require('./missions_objectives')
const players = require('./players')
const characters = require('./characters')
const characters_stats = require('./characters_stats')
const images_2d = require('./images_2d')
const models_3d = require('./models_3d')
const player_characters = require('./player_characters')
const items = require('./items')
app.use('/missions',missions)
app.use('/missions_objectives', missions_objectives)
app.use('/players', players)
app.use('/characters', characters)
app.use('/characters_stats', characters_stats)
app.use('/images_2d', images_2d)
app.use('/models_3d', models_3d)
app.use('/items', items)


app.listen(8080);