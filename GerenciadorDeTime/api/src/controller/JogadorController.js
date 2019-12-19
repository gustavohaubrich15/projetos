const express = require('express');

const Jogador = require('../models/jogador');

const router = express.Router();

router.post('/jogador', async(req,res)=>{
    
    
    try{
        
        return res.send(req.body)
    }catch{
        return res.status(400).send('Erro ao cadastrar Jogador');
    }
});

module.exports = app => app.use('',router);