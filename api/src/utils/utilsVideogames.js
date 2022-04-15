const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const {Op} = require("sequelize")

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/games/{id}






const getApiVideogames = async () => {
  let allApiVideogames = [];
  for (let i = 1; i < 6; i++) {
    let allApiData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    allApiVideogames = allApiVideogames.concat(allApiData.data.results);
  }
  formatedApiVideogames = allApiVideogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      rating: videogame.rating,
      background_image: videogame.background_image,
      isDataBase: false,
      genres: videogame.genres.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      }),
    };
  });
  return formatedApiVideogames;
};




const getDbVideogames = async () => {
  return await Videogame.findAll({
    attributes: ["id","name","rating","background_image","isDataBase"],
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllVideogames = async () => {
  const allDbVideogames = await getDbVideogames()
  const allApiVideogames = await getApiVideogames()
  return allDbVideogames.concat(allApiVideogames)
}

const getApiVideogamesByName = async (name) => {
  const apiSearch = await axios.get(`https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`)
  const videogamesByName = await apiSearch.data.results.map( videogame => {
    return {
      id: videogame.id,
      name: videogame.name,
      rating: videogame.rating,
      background_image: videogame.background_image,
      isDataBase: false,
      genres: videogame.genres.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      }),
    };
  })

  return videogamesByName
}

const getDbVideogamesByName = async (name) => {
  let videogamesByName = await Videogame.findAll({
    attributes: ["id", "name", "rating", "background_image", "isDataBase"],
    where: {
      name: {
        [Op.substring]: name,
      },
    },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  return videogamesByName;
};

const getVideogamesByName = async (name) => {
  const apiVideogamesByName = await getApiVideogamesByName(name)
  const dbVideogamesByName = await getDbVideogamesByName(name)
  return apiVideogamesByName.concat(dbVideogamesByName)
}


const transformToString = (iterador) => {
  let string = "";
  console.log(iterador)
  if (iterador !== null){
    string = string + iterador[0].platform.name;
    for (let i = 1; i < iterador.length; i++) {
      string = string + ", " + iterador[i].platform.name;
    }
    return string;
  }
  return ("This videogame havn´t platforms asociated")
  
};


const getApiVideogameById = async (id) => {

    const apiSearch = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const videogameById = {
      id: apiSearch.data.id,
      name: apiSearch.data.name,
      released: apiSearch.data.released,
      rating: apiSearch.data.rating,
      description: apiSearch.data.description,
      background_image: apiSearch.data.background_image,
      platforms: transformToString(apiSearch.data.platforms),
      isDataBase: false,
      genres: apiSearch.data.genres.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      }),
    }
  return videogameById
}

const getDbVideogameById = async (id) => {
  let videogameById = await Videogame.findAll({
    where: {
      id: {
        [Op.substring]: id,
      },
    },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  return videogameById;
};


const isUUID =  ( UUID ) => {
  let id = "" + UUID;

  id = id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (id === null) {
    return false;
  }
  return true;
}

const getVideogameById = async (id) => {
  let isUuid = isUUID(id);
  if (isUuid) {
    const dbVideogameById = await getDbVideogameById(id);
    return dbVideogameById;
  } else {
    const apiVideogameById = await getApiVideogameById(id);
    return apiVideogameById;
  }
};










module.exports = {
  getVideogamesByName,
  getAllVideogames,
  getVideogameById
}































































/* const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/games/{id}

const getApiVideogames = async () => {
  let allApiVideogames = [];
  for (let i = 1; i < 6; i++) {
    let allApiData = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    allApiVideogames = allApiVideogames.concat(allApiData.data.results);
  }
  return allApiVideogames;
};

const transformToString = (iterador) => {
  let string = "";
  if (iterador){
    string = string + iterador[0].platform.name;
    for (let i = 1; i < iterador.length; i++) {
      string = string + ", " + iterador[i].platform.name;
    }
    return string;
  }
  return ("This videogame havn´t genres asociated")
  
};

const getApiVideogamesToPincipal = async () => {
  let apiVideogames = await getApiVideogames();
  formatedApiVideogames = apiVideogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      rating: videogame.rating,
      background_image: videogame.background_image,
      isDataBase: false,
      genres: videogame.genres.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      }),
    };
  });
  return formatedApiVideogames;
};

const getSpecificApiVideogame = async (id) => {
  let apiVideogame = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  let formatedApiVideogame = {
    id: apiVideogame.id,
    name: apiVideogame.name,
    released: apiVideogame.released,
    rating: apiVideogame.rating,
    description: apiVideogame.description,
    background_image: apiVideogame.background_image,
    platforms: transformToString(apiVideogame.platforms),
    isDataBase: false,
    genres: apiVideogame.genres.map((g) => {
    return {
      id: g.id,
      name: g.name,
    }
  })
  }
  return formatedApiVideogame
};

const getDbVideogamesToPincipal = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getSpecificDbVideogame = async (id) => {
  return await Videogame.findOne({
    where: { id: id },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllVideogamesToPrincipal = async () => {
  const apiVideogames = await getApiVideogamesToPincipal();
  const dbVideogames = await getDbVideogamesToPincipal();
  const allVideogames = dbVideogames.concat(apiVideogames);
  return allVideogames;
};

const getSpecificVideogame = async () => {
  const apiVideogames = await getSpecificApiVideogame();
  const dbVideogames = await getSpecificDbVideogame();
  if (apiVideogames) {
    return apiVideogames;
  } else {
    if (dbVideogames) {
      return dbVideogames;
    } else {
      return (error = new error("This ID doen´s exist"));
    }
  }
};

const searchByName = async (allVideogames, name) => {
  let videogamesByName = await allVideogames.filter((videogame) =>
    videogame.name.toLowerCase().includes(name.toLowerCase())
  );
  if (videogamesByName.length > 0) {
    if (videogamesByName.length > 14) {
      videogamesByName.slice(0, 15);
    }
    return res.status(200).send(videogamesByName);
  } else {
    return res.status(400).send("There were no matches with the search");
  }
};

module.exports = {
  getAllVideogamesToPrincipal,
  getSpecificVideogame,
  searchByName,
}; */




//####################################



/* const axios = require("axios");
const { Videogame, Genre } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;

const transformToString = (iterador)=>{
  let string=""
  string=string + (iterador[0].platform.name)
  for (let i = 1; i < iterador.length; i++) {
    string=string + ", " +(iterador[i].platform.name)
  }
  return string
}


const getApiVideogames = async ()=>{
  let allApiVideogames = []
  for (let i = 1; i < 6; i++) {
    let apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
    let filteredApiVideogames = await apiVideogames.data.results.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        released: videogame.released,
        rating: videogame.rating,
        description: videogame.description_raw,
        background_image: videogame.background_image,
        platforms: transformToString(videogame.platforms),
        isDataBase: false,
        genres: videogame.genres.map(g => {
          return {
            id: g.id,
            name: g.name
          }
        }),
      };
    });
    allApiVideogames= allApiVideogames.concat(filteredApiVideogames)
  }
    return allApiVideogames;
  };
  
  const getVideogamesDb = async ()=>{
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
  
  
  const getAllVideogames = async ()=>{
    const apiVideogames = await getApiVideogames();
    const dbVideogames = await getVideogamesDb();
    const allVideogames = dbVideogames.concat(apiVideogames)
    return allVideogames
  };



  module.exports = {
    getApiVideogames,
    getVideogamesDb,
    getAllVideogames
  } */
