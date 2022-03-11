const express = require('express');
const router = express.Router();
const data = require('./data');

let cont = 0

router.get('/',async (req,res) => {
    if (data.items.length!=0) {
        res.status(200).json(data.items)
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.items,"id",id)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.get('./getimages/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.items,"id",id).image
    if (find(data.images_2d,"model",us)) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});

router.post('/create',async (req,res) => {
    if (req.body.name && req.body.level && req.body.description && req.body.image && req.body.sell_price) {
        data.items.push({name:req.body.name,level:req.body.level,description:req.body.description,image:req.body.image,sell_price:req.body.sell_price,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

router.delete('delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.items,"id",id)){
        data.deleted_items.push(find(data.items,"id",id))
        let index = data.items.indexOf(find(data.items,"id",id))
        data.items.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

router.patch('update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.items.indexOf(find(data.items,"id",req.body.id))
    data.items[index][key]=req.body[key]
    console.log(data)
    res.status(200).json({message: 'Success'})    
});

router.post('/restore/:id',async (req,res) => {
    let id = req.params.id
    if (find(data.deleted_items,"id",id)) {
        data.items.push(find(data.deleted_items,"id",id))
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
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