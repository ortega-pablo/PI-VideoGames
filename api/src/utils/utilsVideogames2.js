const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiVideogames = async () => {
    let allApiVideogames = []
    for (let i = 0; i < array.length; i++) {
        let allApiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        allApiVideogames = allApiVidegames.concat(allApiData.data.results)
    }
  return allApiVideogames;
};


const transformToString = (iterador)=>{
    let string=""
    string=string + (iterador[0].platform.name)
    for (let i = 1; i < iterador.length; i++) {
      string=string + ", " +(iterador[i].platform.name)
    }
    return string
  }


const getApiVideogamesToPincipal = async () => {
  let formatedApiVideogames = await getApiVideogames().map(
    (videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        //released: videogame.released,
        rating: videogame.rating,
        background_image: videogame.background_image,
        //platforms: transformToString(videogame.platforms),
        isDataBase: false,
        genres: videogame.genres.map((g) => {
          return {
            id: g.id,
            name: g.name,
          };
        }),
      };
    }
  );
  return formatedApiVideogames
};

const getSpecificApiVideogame = async () => {
    let formatedApiVideogames = await getApiVideogames().map(
      (videogame) => {
        return {
          id: videogame.id,
          name: videogame.name,
          released: videogame.released,
          rating: videogame.rating,
          background_image: videogame.background_image,
          platforms: transformToString(videogame.platforms),
          isDataBase: false,
          genres: videogame.genres.map((g) => {
            return {
              id: g.id,
              name: g.name,
            };
          }),
        };
      }
    );
    return formatedApiVideogames
  };
  
  const getDbVideogamesToPincipal = async ()=>{
    return await Videogame.findAll({
        attributes:[id, name, rating, background_image, isDataBase],
      include: {
        model: Genre,
        attributes: ["id","name"],
        through: {
          attributes: [],
        },
      }
    });
  }

  const getSpecificDbVideogame = async ()=>{
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["id","name"],
        through: {
          attributes: [],
        },
      }
    });
  }

  const getAllVideogamesToPrincipal = async () => {
        const apiVideogames = await getApiVideogamesToPincipal();
        const dbVideogames = await getDbVideogamesToPincipal();
        const allVideogames = dbVideogames.concat(apiVideogames)
        return allVideogames
  }

  


  const getSpecificVideogames = async () => {

    const apiVideogames = await getSpecificApiVideogame();
    const dbVideogames = await getSpecificDbVideogame();
    const allVideogames = dbVideogames.concat(apiVideogames)
    return allVideogames
}

module.exports = {
    getAllVideogamesToPrincipal,
    getSpecificVideogames
  }




  4aa3ceed-7992-4566-bf8f-6f8115cdfe30