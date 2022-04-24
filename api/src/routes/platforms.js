const { Router } = require("express");
const { getDbPlatforms } = require("../utils/utilsPlatforms");
const router = Router();


router.get("/", async (req, res, next) => {
  try {
    let allPltforms = await getDbPlatforms();
    console.log("allPltforms")
    res.status(200).send(allPltforms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
