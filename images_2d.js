const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.images_2d.length!=0) {
        res.status(200).json(data.images_2d)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.images_2d,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.address) {
        data.images_2d.push({address:req.body.address,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('/delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.images_2d,"id",id)){
        let index = data.images_2d.indexOf(find(data.images_2d,"id",id))
        data.images_2d.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('/update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.images_2d.indexOf(find(data.items,"id",req.body.id))
    data.images_2d[index][key]=req.body[key]
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