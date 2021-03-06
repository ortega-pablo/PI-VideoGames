const { Router } = require("express");
const { getDbGenres } = require("../utils/utilsGenres");
const router = Router();

// GET https://api.rawg.io/api/genres

router.get("/", async (req, res, next) => {
  try {
    let allGenres = await getDbGenres();
    res.status(200).send(allGenres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
