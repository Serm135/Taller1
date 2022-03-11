const data = {
    missions: [
      {
        name: 'La derrota',
        description: 'Derrota a Voldemord',
        level_reward: 2,
        level_requirement: 35,
        quest_giver_character: 'Harry',
        id: 0
      },{
        name: 'La busqueda',
        description: 'Busca los restos de las reliquias',
        level_reward: 2,
        level_requirement: 36,
        quest_giver_character: 'Harry',
        id: 0
      }
    ],
    mission_objectives: [
      {
        name: 'A la cabeza',
        description: 'Dale un golpe a la cabeza a Voldemord',
        count: 2,
        mission: 'La derrota',
        id: 0
      },{
        name: 'Esquiva',
        description: 'Esquiva 3 habilidades',
        count: 3,
        mission: 'La derrota',
        id: 1
      }
    ],
    players: []
  }
module.exports = data