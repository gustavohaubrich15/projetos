const mongoose = require('../database/index');

const JogadorSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    idade:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    localidade:{
        type:String
    },
    criacao:{
        type:Date,
        default:Date.now
    },
});

const Jogador = mongoose.model('Jogador',JogadorSchema);
