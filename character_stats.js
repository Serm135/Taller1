const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.character_stats.length!=0) {
        res.status(200).json(data.character_stats)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.character_stats,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if ( req.body.attribute_1 && req.body.attribute_2 && req.body.attribute_3) {
        data.character_stats.push({life:attribute_1*20,power:(attribute_1*10)+(attribute_2*25),magic:attribute_3*100,attribute_1:req.body.attribute_1,attribute_2:req.body.attribute_2,attribute_3:req.body.attribute_3,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('/delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.character_stats,"id",id)){
        let index = data.character_stats.indexOf(find(data.character_stats,"id",id))
        data.character_stats.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('/update/:key',async (req,res) => {
    if (key=='life' || key == 'power' || key == 'magic') {
        res.status(204).json({message:'No es posible modificar estos campos'})
    }else{
        let key=req.params.key
        let index = data.character_stats.indexOf(find(data.character_stats,"id",req.body.id))
        data.character_stats[index][key]=req.body[key]
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
module.exports = router;
