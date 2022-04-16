const { Router } = require("express");
const { Videogame } = require("../db");
const router = Router();
const {
  getVideogamesByName,
  getAllVideogames,
  getVideogameById,
} = require("../utils/utilsVideogames");

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    if (name) {
      let videogamesByName = await getVideogamesByName(name);
      let filteredVideogames = videogamesByName.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredVideogames.length >= 1) {
        await filteredVideogames.sort((o1, o2) => {
          if (o1.name.length > o2.name.length) {
            return 1;
          } else if (o1.name.length < o2.name.length) {
            return -1;
          } else {
            return 0;
          }
        });
        if (filteredVideogames.length >= 16) {
          let shortFiltered = filteredVideogames.slice(0, 15);
          return res.status(200).send(shortFiltered);
        }
        return res.status(200).send(filteredVideogames);
      } else {
        return res.status(404).send("No matching video games found.");
      }
    } else {
      let allVideogames = await getAllVideogames();
      res.status(200).send(allVideogames);
    }
  } catch (error) {
    next(error);
  }
}),
  router.get("/:id", async (req, res, next) => {
    const videogameId = req.params.id;
    try {
      let videogameById = await getVideogameById(videogameId);
      if (videogameById) {
        res.status(200).send(videogameById);
      }
    } catch (error) {
      next(error);
    }
  });

router.post("/", async (req, res, next) => {
  const {
    id,
    background_image,
    name,
    description,
    released,
    rating,
    platforms,
  } = req.body;

  try {
    const newVideogame = await Videogame.create({
      id,
      background_image,
      name,
      description,
      released,
      rating,
      platforms,
    });
    res.status(201).send(newVideogame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
