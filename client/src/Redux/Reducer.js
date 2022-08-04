
const initialState = {
  pokemons:[],
  allpokemons:[],
  Tipos:[],
  detail:[],

}

export default function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_ALL_POKEMONS':
            return{
              ...state,
              pokemons: action.payload,
              allpokemons: action.payload,
            }
        case 'GET_TIPOS':
        return {
            ...state,
            Tipos: action.payload
        }
        case 'GET_BY_NAME_POKEMON':
          const nameSearched = state.pokemons.filter((e) => {
            return e.Nombre === action.payload;
          });
          if (nameSearched.length !== 0) {
            return {
              ...state,
              pokemons: nameSearched,
            };
          } else {
            return {
              ...state,
              pokemons: false,
            };
          }

          case 'GET_DETAILS':
            return { ...state, 
              detail: action.payload 
            };


        case 'FILTER_BY_TIPOS':
          const allpokemons1 = state.allpokemons;
          const typesFiltered =
            action.payload === "allTypes"
            ? allpokemons1
            : allpokemons1.filter(
              (e) =>
                e.Tipos[0].Nombre === action.payload ||
                e.Tipos[1]?.Nombre === action.payload
            );
          return {
            ...state,
            pokemons: typesFiltered,
          };


      case 'FILTER_BY_ORIGEN':
          const allPokemons = state.allpokemons
              const createdfilter = action.payload === 'createdPokemon' ? allPokemons.filter(p => p.ID.length > 3) : allPokemons.filter(p => p.ID < 1400)
              return {
                ...state,
                pokemons: action.payload === 'allOrigin' ? state.allpokemons : createdfilter
              };

            
        case 'ORDER_BY_NOMBRE':
          let pokemonSort = action.payload === "aToZ" 
          ? state.pokemons.sort((a,b) => {
            if(a.Nombre > b.Nombre ){return 1}
            if(a.Nombre < b.Nombre){return -1} 
            return 0
          }) : state.pokemons.sort((a,b) => {
            if(a.Nombre > b.Nombre ){return -1}
            if(a.Nombre < b.Nombre){return 1}
            return 0
          })
        return {
          ...state,
          pokemons: pokemonSort
        };
        case 'ORDER_BY_ATAQUE':
          let pokemonSort1 = action.payload === "minToMax" 
          ? state.pokemons.sort((a,b) => {
            if(a.Ataque > b.Ataque){return 1}
            if(a.Ataque < b.Ataque){return -1} 
            return 0
          }) : state.pokemons.sort((a,b) => {
            if(a.Ataque > b.Ataque){return -1}
            if(a.Ataque < b.Ataque){return 1}
            return 0
          })
        return {
          ...state,
          pokemons: pokemonSort1
        };
        case 'POST_POKEMON':
        return {
         ...state,
        }

        case 'RESET_DETAIL':
        return {
          ...state,
          detail: {}
        }

         default :
          return state
            
    }
}