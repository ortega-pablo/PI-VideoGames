const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getApiGenres = async () => {
    let allApiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let filteredApiGenres = await allApiGenres.data.results.map((genre) => {
        return{
            name: genre.name
        }
    })
    filteredApiGenres.forEach(genre => {
      Genre.findOrCreate({
        where:{
          name: genre.name
        }
      })      
    });
    return filteredApiGenres
}


const getDbGenres = async () => {
  return await Genre.findAll();
}



  module.exports = {
    getApiGenres,
    getDbGenres
  }