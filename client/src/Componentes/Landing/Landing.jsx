import React from "react"
import { Link } from "react-router-dom";
import a from "./Landing.module.css"


export default function Landing(){
    return (
       <div className={a.container}>
         
         <div className={a.container1}>
            <h1>
             <nav>
           <ul className={a.list} key={a.list}>
           <li className={a.listaordenada} key={a.listaordenada}>
            <h1>Bienvenidos al mundo Pokemon!!</h1>
           <Link to={'/pokemons'} style={{ textDecoration: "inherit" }} key={a.Link}> 
             <button className={a.btn}>Empecemos con la aventura!</button>
           </Link>
           </li>
           </ul>  
          </nav>  
            </h1>
    
         </div>
      
       </div>
    )
}
