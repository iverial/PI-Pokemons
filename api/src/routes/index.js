const { Router, response } = require('express');
const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

function filtrarinfodetallada(array, infoafiltrar){
   let { name, id, height, weight, sprites, stats, types } = infoafiltrar;
   array.push({
    ID: id,
    Nombre: name.toUpperCase(),
    Vida: stats[0].base_stat,
    Ataque: stats[1].base_stat,
    Defensa: stats[2].base_stat,
    Velocidad: stats[5].base_stat,
    Altura: height,
    Peso: weight,
    Tipos: [
      { Nombre: types[0].type.name.toUpperCase() },
      types[1] ? { Nombre: types[1]?.type.name.toUpperCase() } : null,
    ],
    Imagen: sprites.other.dream_world.front_default,
  });
}

router.get("/pokemons/:id", async  (req, res)=> {
  let pokemonID = req.params.id;
  if(pokemonID > 0){
    try {
     let array = []
     let pokemonporid = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(pokemonID)}/`);
     let pokemonpoiddata = await pokemonporid.data;
     await filtrarinfodetallada( array , pokemonpoiddata)
     res.send(array)
    } catch (error) {
     res.status(404).send("El pokemon no existe")
    }} else {
        try {
            let array = []
            let pokeDB = await Pokemon.findOne({
            where: { ID: pokemonID },
                include: {
                model: Tipo,
                as: "Tipos",
                attributes: ["Nombre"],
                through: {
                    attributes: [],
                  },
                }
            })
            array.push(pokeDB)
            res.status(201).send(array)
        } catch (error) {
            res.status(404).send("Pokemon no encontrado")
        }
    }
})

router.get("/pokemons", async function(req, res) { 
    if(req.query.name){
    let pokemonName = req.query.name
    try {
        let array = []
        let pokemonporid = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);
        let pokemonpoiddata = await pokemonporid.data;
        await filtrarinfodetallada( array , pokemonpoiddata)
       return res.status(201).send(array)
       } catch (error) {
        let pkDB = await Pokemon.findOne({
            where: { Nombre: pokemonName },
                include: {
                model: Tipo,
                as: "Tipos",
                attributes: ["Nombre"],
                through: {
                    attributes: [],
                  },
                }
            })
       if(pkDB !== null){
          res.status(201).send(pkDB)  
       }             
        res.status(404).send("El pokemon no existe")
       }
    }else {
    let array = []
    for (let i = 1; i <= 40; i++) {
        let pokemonlist = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokemonlistdata = await pokemonlist.data;
        await filtrarinfodetallada(array , pokemonlistdata)
  } 
  let pokeDB = await Pokemon.findAll({
    include: {
      model: Tipo,
      as: "Tipos",
      attributes: ["Nombre"],
      through: {
        attributes: [],
      },
    },
  });
  return res.status(200).send(pokeDB.concat(array))
 }
})

router.post('/pokemons', async (req, res) => {
  const { Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Tipos} = req.body;

  if(isNaN(Vida) || isNaN(Ataque) || isNaN(Defensa) || isNaN(Velocidad) || isNaN(Altura) || isNaN(Peso) || Tipos.length === 0){
    return res.status(404).send("Algun dato no es un numero o no contiene un tipo")
  } else if(!Nombre){
    return res.status(404).send('El nombre tiene que existir')
  }

  const [instance, pokeCreado] = await Pokemon.findOrCreate({
      where: { Nombre: Nombre },
      defaults: {
    Nombre: Nombre.toUpperCase(),
    Vida,
    Ataque,
    Defensa,
    Velocidad,
    Altura,
    Peso,
      } 
      });
  await instance.addTipos(Tipos)
      if(pokeCreado){
        res.status(200).send(`Pokemon creado existosamente ID: ${instance.ID}`)
      } else {
          res.status(404).send('El pokemon ya existe') 
      }
})

router.get("/types", async function (req, res) {
  for (var i = 1; i <= 18; i++) {
    let tipospkapi = await axios.get(`https://pokeapi.co/api/v2/type/${i}/`);
    let listadtipos = await tipospkapi.data;
    let { name: Nombre } = await listadtipos;
    const newType = await Tipo.findOrCreate({
      where: {
        Nombre: Nombre.toUpperCase(),
      },
    });
  }
  const listadetipos = await Tipo.findAll();
  res.send(listadetipos);
});

router.delete("/pokemons/:ID", async function (req, res){
  let {ID} = req.params

  await Pokemon.destroy({
    where:{ID: ID}
  })
  res.send("Pokemon borrado")
})


module.exports = router;
