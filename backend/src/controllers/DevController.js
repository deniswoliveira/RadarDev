const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });    
        }

        return response.json(dev);
    },

    async update(request, response){   
        const { github_username, bio, name, avatar_url, techs} = request.body;

        let dev = await Dev.findOne({github_username});

        if(dev){
            if(bio){
                dev.bio = bio;
            } 
            if (name) {
                dev.name = name;
            }
            if (avatar_url) {
                dev.avatar_url = avatar_url;
            } 
            if (techs) {
                const techsArray = parseStringAsArray(techs);
                dev.techs = techsArray
            }
            await dev.save();
        }
        return response.json(dev);
    },

    async delete(request, response){

        const { github_username, _id } = request.body;
        
        if (github_username){
            dev = await Dev.findOneAndDelete({github_username});
        } else if (_id){
            dev = await Dev.findOneAndDelete({_id});
        } else{
            dev = {msg: "Parametros invalidos"}
        }
        return response.json(dev);
    },

};