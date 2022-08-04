export function validate(input){
    let errors = {};
    const numberExpresion = /^-?\d*(\.\d+)?$/;
   
  
    //Nombre:
  
    if (!input.Nombre) {
      errors.Nombre = "Tienes que colocar un nombre para el pokemon";
    } else if (input.Nombre.search(/^[a-zA-Zñáéíóúü]*$/)) {
      //Valido el input con expresion regular.
      // El método search() ejecuta una búsqueda que encaje entre una expresión regular y el objeto desde el que se llama.
      errors.Nombre = "El nombre no puede contener números ni caracteres especiales";
    }
    if (input.Nombre.length > 15) {
      errors.Nombre = "El nombre no puede tener mas de 15 letras";
    }
  
  
    //Vida
  
    if (input.Vida < 1 || input.Vida > 999) {
      errors.Vida = "Los puntos de vida no pueden ser menos que 1 o superiores a 999";
    } else if (input.Vida.search(numberExpresion)) {
      //Valido el input con expresion regular.
      errors.Vida = "El valor debe ser sólo un número.";
    }
  
    //Ataque
  
    if (input.Ataque < 1 || input.Ataque > 999) {
      errors.Ataque = "El poder de Ataque debe ser mayor a 1 y menor que 999";
    } else if (input.Ataque.search(numberExpresion)) {
      errors.Ataque = "El valor debe ser sólo un número.";
    }
  
    //Defensa
  
    if (input.Defensa < 1 || input.Defensa > 999) {
      errors.Defensa = "Los puntos de Defensa no pueden ser menos que 1 o superiores a 999";
    } else if (input.Defensa.search(numberExpresion)) {
      errors.Defensa = "El valor debe ser sólo un número.";
    }
  
    //Velocidad:
  
    if (input.Velocidad < 1 || input.Velocidad > 999) {
      errors.Velocidad = "La velocidad no puede ser menor a 1 o mayor a 999";
    } else if (input.Velocidad.search(numberExpresion)) {
      errors.Velocidad = "El valor debe ser sólo un número.";
    }
  
    //Altura
  
    if (input.Altura < 1 || input.Altura > 999) {
      errors.Altura = "La altura no puede ser menor a 1 o mayor a 999";
    } else if (input.Altura.search(numberExpresion)) {
      errors.Altura = "El valor debe ser sólo un número.";
    }
  
    //Peso
  
    if (input.Peso < 1 || input.Peso > 999) {
      errors.Peso = "El Peso no puede ser menor a 1 o mayor a 999";
    } else if (input.Peso.search(numberExpresion)) {
      errors.Peso = "El valor debe ser sólo un número.";
    }

    
  return errors;
}