const { DataTypes, UUID, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    ID:{
      type: UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Vida:{
      type: INTEGER
    },
    Ataque:{
      type: INTEGER
    },
    Defensa:{
      type: INTEGER
    },
    Velocidad:{
      type: INTEGER
    },
    Altura:{
      type: INTEGER
    },
    Peso:{
      type: INTEGER
    },
    Imagen:{
      type: DataTypes.STRING,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png",
    }
    
  });
};
