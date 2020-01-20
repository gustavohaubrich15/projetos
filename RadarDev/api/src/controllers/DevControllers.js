const axios = require('axios');
const Dev = require('../models/Dev')

module.exports={
    async singUpDev(request, response){
        const {github_username,techs,latitude,longitude}= request.body;

        const devExists = await Dev.findOne({github_username});

        let dev
        
        if(!devExists){
        
        const githubUser = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {name=login,avatar_url,bio}=githubUser.data;
    
        const techsArray =techs.split(',').map(tech=>tech.trim());
    
        const location = {
            type:'Point',
            coordinates:[longitude,latitude]
        };
    
         dev = await Dev.create({
            name,
            github_username,
            avatar_url,
            bio,
            techs:techsArray,
            location
        })
        return response.json(dev);
        }
        return response.status(404).send('Erro ao cadastrar usuário')
    },

    async listDevs(request,response){

        const listDevs = await Dev.find();

        return response.json(listDevs)
    }
};