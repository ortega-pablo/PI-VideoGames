const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

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
    attributes: ["id", "name", "rating", "background_image", "isDataBase"],
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
  const allDbVideogames = await getDbVideogames();
  const allApiVideogames = await getApiVideogames();
  return allDbVideogames.concat(allApiVideogames);
};

const getApiVideogamesByName = async (name) => {
  const apiSearch = await axios.get(
    `https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`
  );
  const videogamesByName = await apiSearch.data.results.map((videogame) => {
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

  return videogamesByName;
};

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
  const apiVideogamesByName = await getApiVideogamesByName(name);
  const dbVideogamesByName = await getDbVideogamesByName(name);
  return apiVideogamesByName.concat(dbVideogamesByName);
};

const transformToString = (iterador) => {
  let string = "";
  if (iterador !== null) {
    string = string + iterador[0].platform.name;
    for (let i = 1; i < iterador.length; i++) {
      string = string + ", " + iterador[i].platform.name;
    }
    return string;
  }
  return "This videogame havn´t platforms asociated";
};

const getApiVideogameById = async (id) => {
  const apiSearch = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  const videogameById = [
    {
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
    },
  ];
  return videogameById;
};

const getDbVideogameById = async (videogameId) => {
  let videogameById = await Videogame.findAll({
    where: {
      id: videogameId,
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

const isUUID = (UUID) => {
  let id = "" + UUID;

  id = id.match(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
  );
  if (id === null) {
    return false;
  }
  return true;
};

const getVideogameById = async (videogameId) => {
  let isUuid = isUUID(videogameId);
  if (isUuid) {
    const dbVideogameById = await getDbVideogameById(videogameId);
    if (dbVideogameById.length !== 0) {
      return dbVideogameById;
    } else {
      throw new Error("The entered ID does not exist.");
    }
  }
  if (Number.isInteger(Number(videogameId))) {
    const apiVideogameById = await getApiVideogameById(videogameId);
    if (apiVideogameById.length !== 0) {
      return apiVideogameById;
    } else {
      throw new Error("The entered ID does not exist.");
    }
  }

  throw new Error("Error, the entered value does not correspond to an ID.");
};

module.exports = {
  getVideogamesByName,
  getAllVideogames,
  getVideogameById,
};
