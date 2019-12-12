const express = require('express');
const gameRouter = express.Router();
const Game = require('../model/game');

//CRUD

//read
gameRouter.get('/',(req,res)=>{
    Game.find({},(err,response)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to get games",
                msgError : true
            }});
        else{
            res.status(200).json({response});
        }
            
    });
});

//create
gameRouter.post('/',(req,res)=>{
    const game = new Game(req.body);
    game.save((err,document)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to add games",
                msgError : true
            }});
        else
            res.status(200).json({message:{
                msgBody: "Successfully Added games",
                msgError : false
            }});
    });
});

// delete
gameRouter.delete('/:id',(req,res)=>{
    Game.findByIdAndDelete(req.params.id,err=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to Delete game",
                msgError : true
            }});  
        else
            res.status(200).json({message:{
                msgBody: "Successfully Deleted game",
                msgError : false
            }});     
    });
});

//update 
gameRouter.put('/:id',(req,res)=>{
    Game.findOneAndUpdate({_id : req.params.id},req.body,{runValidators: true},(err,response)=>{
        if(err)
            res.status(500).json({message:{
                msgBody : "Unable to Update game",
                msgError : true
            }});
        else
        res.status(200).json({message:{
            msgBody: "Successfully Updated game",
            msgError : false
        }});   
    });
});

module.exports = gameRouter;