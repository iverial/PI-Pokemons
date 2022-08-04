import React from "react";
import a from "./Pokemon.module.css"

export function Pokemon({Imagen, Nombre, Tipos}){
    return (
        <div className={a.container} key={Nombre}>      
        <div>
          <img
            className={a.img}
            src={Imagen}
            alt="Imagen del Pokemon."
          />
        </div>
        <h2 className={a.Tipos}>{Nombre}</h2>
        <span>
                <h3 className={a.Tipos}>
                 <span id={Tipos[0].Nombre}>{Tipos[0].Nombre}</span>{" "}
                {Tipos[1] ? (
                  <span id={Tipos[1].Nombre}>{Tipos[1].Nombre}</span>
                ) : null}
                 </h3>
              </span>

      </div>
    )
}
