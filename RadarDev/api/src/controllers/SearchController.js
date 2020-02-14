const Dev = require('../models/Dev')

module.exports={

 async searchDev(request,response){
    //Buscar todos os devs num raio de 10km
    //Filtrar por tecnologia
    const {latitude,longitude,techs}= request.query;

    const techsArray =techs.split(',').map(tech=>tech.trim());


    const devs = await Dev.find({
        techs:{
            $in:techsArray,
        },
        location:{
            $near:{
                $geometry:{
                    type:'Point',
                    coordinates:[longitude,latitude]
                },
                $maxDistance:10000,
            }
        }
    });
        
    return response.json(devs);
    }

}