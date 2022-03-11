const express = require('express');
const router = express.Router();
const data = require('./data');
const images_2d = require('./images_2d');

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

app.post('/create',async (req,res) => {
    if (req.body.name && req.body.level && req.body.description && req.body.image && req.body.sell_price) {
        data.items.push({user:req.body.username,name:req.body.name,id:cont++})
        console.log(data)
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});

app.delete('delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.items,"id",id)){
        data.deleted_items.push(find(data.items,"id",id))
        let index = data.items.indexOf(find(data.items,"id",id))
        data.items.splice(index,index)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});

app.patch('update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.items.indexOf(find(data.items,"id",req.body.id))
    data.items[index][key]=req.body[key]
    console.log(data)
    res.status(200).json({message: 'Success'})    
});

app.post('/restore/:id',async (req,res) => {
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