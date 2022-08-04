import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonId, resetDetail } from "../../Redux/actions";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import a from "./Details.module.css"



export default function Details(){

    const dispatch = useDispatch();
    const params = useParams();
    const Pokemon = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getPokemonId(params.id))
        return dispatch(resetDetail())
    },[dispatch, params.id])

    if(!Pokemon.length){
        return (
              <div>
              <Loading/>
              </div>  
        );
    } else if(Pokemon.length !== 0){
        return (
            <div>
               <div className={a.cardsDetails}>
            <div>
              <h3 className={a.pokeName}>
                {`#${Pokemon[0].ID}:`} {Pokemon[0].Nombre}
              </h3>
              <img
                src={Pokemon[0].Imagen}
                alt={Pokemon[0].Nombre}
                className={a.pokeImage}
              />
            </div>
            <div className={a.types}>
            <h4>
                 <span id={Pokemon[0].Tipos[0].Nombre}>{Pokemon[0].Tipos[0].Nombre}</span>{" "}
                {Pokemon[0].Tipos[1] ? (
                  <span id={Pokemon[0].Tipos[1].Nombre}>{Pokemon[0].Tipos[1].Nombre}</span>
                ) : null}
                 </h4>
            </div>
            <div className={a.description}>
              <div>
                <h4>{`VIDA: ${Pokemon[0].Vida}`}</h4>
              </div>
              <div>
                <h4>{`ATAQUE: ${Pokemon[0].Ataque}`}</h4>
              </div>
              <div>
                <h4>{`DEFENSA: ${Pokemon[0].Defensa}`}</h4>
              </div>
              <div>
                <h4>{`VELOCIDAD: ${Pokemon[0].Velocidad}`}</h4>
              </div>
              <div>
                <h4>{`ALTURA: ${Pokemon[0].Altura}`}</h4>
              </div>
              <div>
                <h4>{`PESO: ${Pokemon[0].Peso}`}</h4>
              </div>
            </div>
          </div>
            </div>
        )
    } else if(!Pokemon.length){
        return (
            <div>
                <ErrorPage></ErrorPage>
            </div>
        );
    } 
}