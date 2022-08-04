import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import a from "./Nav.module.css";

export default function Nav(){
    return(
      <div className={a.navcontainer}>
        <div className={a.allli}>
          <Link to="/pokemons/" style={{ textDecoration: "inherit" }}>
            <li className={a.linkroute} key="li">Home</li>
          </Link>
          <Link to="/create" style={{ textDecoration: "inherit" }}>
            <li className={a.linkroute} key="s">Crear Pokemon</li>
          </Link>
        </div>
        <div className={a.searchcontainer}>
          <SearchBar />
        </div>
    </div>
    )
}