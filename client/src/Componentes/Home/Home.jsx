import a from "./Home.module.css"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pokemon} from "../Pokemon/Pokemon"
import {OrderByNombre, getAllPokemons, OrderByAtaque, filterByTipos, getAllTipos} from "../../Redux/actions";
import { Link } from "react-router-dom";
import { useState } from "react";
import { filterByOrigin } from "../../Redux/actions";

import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import Nav from "../nav/Nav";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Home(){
  const dispatch = useDispatch();
  //seteo estados locales
  const [, setOrder] = useState('')
  const [, setTipos] = useState("allpokemon");
  //Me traigo estados globales.
  const totalTypes = useSelector((state) => state.Tipos);
  const allPokemons = useSelector((state) => state.pokemons);
  //paginados..
  const [currentPage,setCurrentPage] = useState(1)
  const [PokemonsPerPage, ] = useState(12)
  const IndexOfLastPokemon = currentPage * PokemonsPerPage // 11
  const IndexOfFirtsPokemon = IndexOfLastPokemon - PokemonsPerPage // 0
  const currentPokemons = allPokemons.slice(IndexOfFirtsPokemon, IndexOfLastPokemon)

  const indexPages = Math.ceil(allPokemons.length / PokemonsPerPage)


  const back = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage !== indexPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const begin = () => {
    setCurrentPage(1);
  };

  const end = () => {
    setCurrentPage(indexPages);
  };

  if (currentPage > indexPages) {
    back();
  }

  const paginado = (PageNumber) => {
    setCurrentPage(PageNumber)
  }



  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleFilterByTypes(e){
    e.preventDefault()
    const pokefiltrado = allPokemons.every((pokemon) => pokemon.Tipos[0].Nombre !== e.target.value
    );
    if(e.target.value === 'allTypes'){
      dispatch(filterByTipos('allTypes'))
      setTipos('allTypes');
      setCurrentPage(1)
      setOrder(`Ordenado ${'allTypes'}`)
    }else if(pokefiltrado){
      return alert(`No existe ningun pokemon con ese tipo`)
    } else {
    dispatch(filterByTipos(e.target.value))
    setTipos(e.target.value);
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
    }
  }

  function handleSort(e){
    e.preventDefault();
    dispatch(OrderByNombre(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleSort2(e){
    e.preventDefault();
    dispatch(OrderByAtaque(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }


  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTipos())
  }, [dispatch]);


  if(!allPokemons.length || !totalTypes.length){
    return (
      <div>
        <Loading/>
      </div>
    )
  } else if(allPokemons.length !== 0 || totalTypes.length !== 0){
    return (
       <div className={a.home}>

        <Nav></Nav>
       
       <div className={a.asidecontainer}>
             <div className= {a.ordenado}>
          <label className={a.tituloF}>Ordenar por: </label>
          <select
            className={a.select}
            defaultValue="name"
            onChange={(e) => handleSort(e)}
          >
            <option className={a.options} value="name" disabled>
              Nombre
            </option>
            <option className={a.options} value="aToZ">
              A - Z
            </option>
            <option className={a.options} value="zToA">
              Z - A
            </option>
          </select>

          <select
            className={a.select}
            defaultValue="Ataque"
            onChange={(e) => handleSort2(e)}
          >
            <option className={a.options} value="Ataque" disabled>
              Ataque
            </option>
            <option className={a.options} value="minToMax" key={a.options}>
              Min a Max
            </option>
            <option className={a.options} value="maxToMin" key={a.options}>
              Max a Min
            </option>
          </select>
        </div>

        <div className={a.filtrado}>
          <label className={a.tituloF}>Filtrar por: </label>
          <select
            className={a.select}
            defaultValue="Todos"
            onChange={(e) => handleFilterOrigin(e)}
          >
            <option className={a.options} value="allOrigin" key={a.options}>
              Todos
            </option>
            <option className={a.options} value="pokemonApi" key={a.options}>
              PokemonApi
            </option>
            <option className={a.options} value="createdPokemon" key={a.options}>
              PokemonCreado
            </option>
          </select>

          <select
            className={a.select}
            defaultValue="Tipos"
            id="type-select"
            onChange={(e) => handleFilterByTypes(e)}
          >
            <option className={a.options} value="Tipos" disabled>
              Tipos
            </option>
            <option className={a.options} value="allTypes" key={a.options}>
              Todos los Tipos
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.Nombre < b.Nombre) return -1;
                  if (a.Nombre > b.Nombre) return 1;
                  return 0;
                })
                .map((t) => (
                  <option className={a.options} value={t.Nombre} key={t.Nombre}>
                    {t.Nombre}
                  </option>
                ))}
          </select>
        </div>
        </div>

  <div className={a.divPaginado}>
  <div className={a.divpaginado1}>
          <button onClick={begin} className={a.btnpaginado}>
            {"<"}
          </button>
          <button onClick={back} className={a.btnpaginado}>
            Previous
          </button>
          <button onClick={next} className={a.btnpaginado}>
            Next
          </button>
         <button onClick={end} className={a.btnpaginado}>
            {">"}
       </button>
        </div>
       <Paginado PokemonsPerPage={PokemonsPerPage}
       allPokemons={allPokemons.length} 
       paginado={paginado}
       className={a.paginado}
       key={paginado}
      />

  </div>

        <div className={a.maincards}>
        {currentPokemons?.map((p) => {
         return (
            <div className={a.cardpokemons}>
                <Link className={a.link} key={p.ID} to={"/pokemonsdetail/" + p.ID} style={{ textDecoration: "inherit" }}>
                  <Pokemon Imagen={p.Imagen} Nombre={p.Nombre} Tipos={p.Tipos} ID={p.ID}/>   
                </Link>
            </div>            
               );
            })}
      </div> 
       </div>  
    ) 
  } else if(!allPokemons.length || !totalTypes.length){
    return (
        <div>
           <ErrorPage></ErrorPage>
        </div>
    );
} 
}
