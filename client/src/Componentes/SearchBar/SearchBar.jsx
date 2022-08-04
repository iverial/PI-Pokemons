import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getNamePokemon } from "../../Redux/actions";
import a from "./SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const allpokemons = useSelector((state) => state.pokemons)
    const [Nombre, setNombre] = useState("");

    useEffect(() => {
      dispatch(getAllPokemons())
    },[dispatch])
  

    function handleInputChange(e) {
      e.preventDefault();
      setNombre(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      try {
        let encontrarNombre = allpokemons.every((e) => e.Nombre.toUpperCase() !== Nombre.toUpperCase())
          if(!Nombre){
            return alert('Debes colocar un Nombre')
          }else if(encontrarNombre){
            return alert('No existe ese pokemon')
          } else {
      dispatch(getNamePokemon(Nombre.toUpperCase()));
      setNombre(""); 
      }
      } catch (error) {
        console.log(error)
        return alert('Algo salio mal, intenta nuevamente!')
      }
      
    }
    return(
        <div className={a.searchcontainer}>
        <input
          value={Nombre}
          className={a.inputsearch}
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Buscar Pokemon..."
        />
        <button className={a.btnsearch} onClick={(e) => handleSubmit(e)} type="submit">
          Buscar
        </button>
      </div>
    );
}