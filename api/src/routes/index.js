const { Router } = require('express');
const genresRoute = require("./genres");
const videogamesRoute = require("./videogames");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoute);
router.use("/genres", genresRoute);


module.exports = router;
