const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.players.length!=0) {
        res.status(200).json(data.players)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.players,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.name && req.body.last_login && req.body.password && req.body.username) {
        data.players.push({name:req.body.name,last_login:req.body.last_login,password:req.body.password,username:req.body.username,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.players,"id",id)){
        let index = data.players.indexOf(find(data.players,"id",id))
        data.players.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.players.indexOf(find(data.players,"id",req.body.id))
    data.players[index][key]=req.body[key]
    console.log(data)
    res.status(200).json({message: 'Success'})    
});

function find(lista,key,id) {
    for (let element of lista) {
        if (element[key]==id) {
            return element;
        }
    }
    return false;
}
module.exports = router;