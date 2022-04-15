const { Router } = require("express");
const { Videogame } = require("../db");
const router = Router();
const { getVideogamesByName,getAllVideogames, getVideogameById } = require("../utils/utilsVideogames");


router.get("/", async (req, res, next) => {
  try {

    const name = req.query.name
    if(name){
      let videogamesByName = await getVideogamesByName(name)
      let filteredVideogames = videogamesByName.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
      if(filteredVideogames.length >= 1){
      await  filteredVideogames.sort((o1, o2) => {
          if(o1.name.length > o2.name.length){
            return 1
          }else if(o1.name.length < o2.name.length){
            return -1
          }else{
            return 0
          }
        });
        return res.status(200).send(filteredVideogames)
      }else{
        return res.status(404).send("No matching video games found.")
      }
  }else{
    let allVideogames = await getAllVideogames()
    res.status(200).send(allVideogames)
  }
  } catch (error) {
    next(error)
  }
}),


router.get("/:id" , async (req,res,next) => {
  try {
    let videogameBtId = await getVideogameById()
  if(videogameBtId){
    res.status(200).send(videogameBtId)
  }
  else{
    res.status(404).send("The entered ID does not exist.")
  }
  } catch (error) {
    next(error)
  }
  
})


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

  (module.exports = router);










/* const { Router } = require("express");
const { Videogame } = require("../db");
const router = Router();
const {
  getAllVideogamesToPrincipal,
  getSpecificVideogame,
} = require("../utils/utilsVideogames");



router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    let allVideogames = await getAllVideogamesToPrincipal();
    if (name) {
      let videogameName = await allVideogames.filter((videogame) =>
        videogame.name.toLowerCase().includes(name.toLowerCase())
      ); //filter vacio devuelve true
      if (videogameName.length > 0) {
        if (videogameName.length > 14) {
          videogameName.slice(0, 15);
        }
        res.status(200).send(videogameName);
      } else {
        res.status(400).send("The Videogame hasn´t find");
      }
    }
    res.status(200).send(allVideogames);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const {id} = req.params.id
  try {
    let videogameById = getSpecificVideogame(id)
    res.status(200).send(videogameById)
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

//Mixim para asociar tablas (valores)
router.post("/:videogameId/genre/:genreId", async (req, res, next) => {
  try {
    const { videogameId, genreId } = req.params;
    const videogame = await Videogame.findByPk(videogameId);
    await videogame.addGenre(genreId);
    res.status(200).send("Agregado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
 */