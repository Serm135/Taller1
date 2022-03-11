const express = require('express');
const { mission_objectives } = require('./data');
const router = express.Router();
let cont=0
const data = require('./data')
const mi_ob= require('./missions_objectives')
router.get('/',async (req,res) => {
    if (data.missions.length!=0) {
        temp01=[]
        for (const element of data.missions) {
            const temp={
                mission:[],
                mission_objectives:[]
            }
            temp.mission.push(element)
            if (findlist(data.mission_objectives,"mission",element.name)) {
                temp.mission_objectives.push(findlist(data.mission_objectives,"mission",element.name))
            }
            temp01.push(temp)
        }
        res.status(200).json(temp01)
    }else{
        res.status(204).json({message:'No Content'})
    }
});
router.get('/:id',async (req,res) => {
    let id = req.params.id
    us=find(data.missions,"id",id)
    if (us) {
        temp=[]
        temp.push(us)
        temp.push(findlist(data.mission_objectives,"mission",us.name))
        res.status(200).json(temp)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});
router.get('/character/:name',async (req,res) => {
    let name = req.params.name
    us=findlist(data.missions,"quest_giver_character",name)
    if (us) {
        res.status(200).json(us)
    }else{
        res.status(204).json({message:'No Content'})
    } 
});
router.post('/create',async (req,res) => {
    if (req.body.name && req.body.description && req.body.level_reward && req.body.level_requirement && req.body.quest_giver_character) {
        data.missions.push({name:req.body.name,description:req.body.description,level_reward:req.body.level_reward
                        ,level_requirement:req.body.level_requirement,quest_giver_character:req.body.quest_giver_character,id:cont++})
        res.status(200).json({message: 'Success'}) 
    }else{
        res.status(400).json({message: 'Bad Request'})
    }
       
});
router.delete('/delete/:id',async (req,res) => {
    let id = req.params.id
    if(find(data.missions,"id",id)){
        let index = data.missions.indexOf(find(data.missions,"id",id))
        data.missions.splice(index,1)
        res.status(200).json({message: 'Success'})
    }else{
        res.status(204).json({message:'No Content'})
    }
});
router.patch('/update/:key',async (req,res) => {
    let key=req.params.key
    let index = data.missions.indexOf(find(data.missions,"id",req.body.id))
    data.missions[index][key]=req.body[key]
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
function findlist(lista,key,id) {
    mis=[]
    for (let element of lista) {
        if (element[key]==id) {
            mis.push(element);
        }
    }
    if (mis.length!=0) {
        return mis
    }else{
        return false;
    }
}

module.exports = router;