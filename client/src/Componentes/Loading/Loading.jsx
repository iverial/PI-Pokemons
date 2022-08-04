import React from "react";
import imagenLoading from "../../assets/pikachu.gif"
import a from "./Loading.module.css"

export default function Loading(){
    return (
        <div className={a.container}>
            <h2>Cargando...</h2>
            <img src={imagenLoading} alt="cargando" />
        </div>
    )
}