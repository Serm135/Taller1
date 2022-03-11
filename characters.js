const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.characters.length!=0) {
        res.status(200).json(data.characters)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.characters,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.get('./getmodel/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.characters,"id",id).model
    if (find(data.models_3d,"model",us)) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.name && req.body.stats && req.body.level && req.body.title && req.body.model) {
        data.characters.push({name:req.body.name,stats:req.body.stats,level:req.body.level,title:req.body.title,model:req.body.model,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('/delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.characters,"id",id)){
        let index = data.characters.indexOf(find(data.characters,"id",id))
        data.characters.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('/update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.characters.indexOf(find(data.characters,"id",req.body.id))
    data.characters[index][key]=req.body[key]
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