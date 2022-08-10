import axios from "axios"


export function getAllPokemons(){
  return function(dispatch){
    axios.get('/pokemons')
    .then(response => response.data)
    .then(jsondata => dispatch({
      type: 'GET_ALL_POKEMONS',
      payload: jsondata,
    }))
  }
}




export function getAllTipos(){
  return function(dispatch){
    axios.get('/types')
    .then(response => response.data)
    .then(jsondata => dispatch({
      type: 'GET_TIPOS',
      payload: jsondata
    }))
  }
}

export function getNamePokemon(Nombre) {
  return function (dispatch) {
    try {
      if (Nombre.search(/^[a-zA-Zñáéíóúü]*$/)) {
        return alert("El nombre a buscar solo debe contener letras.");
      } else if(!Nombre){
        return alert("Hay que poner un nombre")
      }
      return dispatch({
        type: 'GET_BY_NAME_POKEMON',
        payload: Nombre,
      });
    } catch (error) {
      return alert(`No existe un Pokémon con ese nombre: ${Nombre}`);
    }
  };
}

export function getPokemonId(id){
  return function (dispatch){
    axios.get( `/pokemons/${id}`)
    .then(response => response.data)
    .then(jsonPokemonIDdata => dispatch({
      type: 'GET_DETAILS',
      payload: jsonPokemonIDdata,  
    }))
  }
}


export function filterByOrigin(payload) {
      return {
        type: 'FILTER_BY_ORIGEN',
        payload: payload,
      };
}

export function filterByTipos(payload) {
    return {
        type: 'FILTER_BY_TIPOS',
        payload: payload,
    };
}


export function OrderByNombre(payload) {
    return {
        type: 'ORDER_BY_NOMBRE',
        payload: payload
    };
}

export function OrderByAtaque(payload){
    return {
        type: 'ORDER_BY_ATAQUE',
        payload: payload
    };
}

export function postPokemon(payload){
  return async function (dispatch){
    try {
      const response = await axios.post('/pokemons', payload)
       return response
    } catch (error) {
     return error 
    }
  }
}

export function resetDetail(){
    return {
      type: 'RESET_DETAIL',
    };
}

export function deletePoke(id){
  return function (dispatch){
     axios.delete( `/pokemons/${id}`)
     .then(response => console.log('Listo'))
  }
}
