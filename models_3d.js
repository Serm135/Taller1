const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.mission_objectives.length!=0) {
        res.status(200).json(data.mission_objectives)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.mission_objectives,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.address) {
        data.mission_objectives.push({address:req.body.address,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.mission_objectives,"id",id)){
        let index = data.mission_objectives.indexOf(find(data.mission_objectives,"id",id))
        data.mission_objectives.splice(index,index)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
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
module.exports = router;