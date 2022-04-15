const { Router } = require("express");
const { Genre } = require("../db");
const { getApiGenres } = require("../utils/utilsGenres");
const router = Router();

// GET https://api.rawg.io/api/genres



router.get("/", async (req, res, next) => {
  try {
    let allGenres = await getApiGenres();
    res.status(200).send(allGenres);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {name} = req.body;
  
  try {
    const newGenre = await Genre.create({
      name
    });
    res.status(201).send(newGenre);

  } catch (error) {
    next(error);
  };

});


module.exports = router;
