const axios = require("axios");
const { Platform } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getApiPlatforms = async () => {
    let allApiPlatforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    let filteredApiPlatforms = await allApiPlatforms.data.results.map((platform) => {
        return{
            name: platform.name
        }
    })
    filteredApiPlatforms.forEach(platform => {
        Platform.findOrCreate({
        where:{
          name: platform.name
        }
      })      
    });
    return filteredApiPlatforms
}

const getDbPlatforms = async () => {
  return await Platform.findAll();
}

  module.exports = {
    getApiPlatforms,
    getDbPlatforms
  }