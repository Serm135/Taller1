const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.player_characters.length!=0) {
        res.status(200).json(data.player_characters)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.player_characters,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.get('/:player',async (req,res) => {
    let player = req.params.player
    us=findplus(data.player_characters,"id",player)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.name && req.body.stats && req.body.level && req.body.title && req.body.model && req.body.player) {
        data.player_characters.push({name:req.body.name,stats:req.body.stats,level:req.body.level,title:req.body.title,model:req.body.model,player:req.body.player,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('/delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.player_characters,"id",id)){
        let index = data.player_characters.indexOf(find(data.player_characters,"id",id))
        data.player_characters.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('/update/:key',async (req,res) => {
    if (key=='player') {
        res.status(204).json({message:'No es posible modificar el dueño de un personaje'})
    }else{
        let key=req.params.key
        let index = data.player_characters.indexOf(find(data.player_characters,"id",req.body.id))
        data.player_characters[index][key]=req.body[key]
        console.log(data)
        res.status(200).json({message: 'Success'})  
    }
});

function find(lista,key,id) {
    for (let element of lista) {
        if (element[key]==id) {
            return element;
        }
    }
    return false;
}
function findplus(lista,key,id) {
    const elements = []
    for (let element of lista) {
        if (element[key]==id) {
            elements.push(element)
        }
    }
    return elements;
}
module.exports = router;