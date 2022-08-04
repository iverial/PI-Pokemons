import React from "react";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllPokemons, getAllTipos, postPokemon } from "../../Redux/actions";
import a from "./Create.module.css";
import Loading from "../Loading/Loading"
import { validate } from "./validate";

export default function Create(){
    const dispatch = useDispatch();
    const history = useHistory()
    const totalTypes = useSelector((state) => state.Tipos);
    const allpokemons = useSelector((state) => state.pokemons);

    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        Nombre: "",
        Vida: "",
        Ataque: "",
        Defensa: "",
        Velocidad: "",
        Altura: "",
        Peso: "",
        Tipos: [],
      });

    useEffect(()=> {
        dispatch(getAllPokemons())
        dispatch(getAllTipos())
    },[dispatch])

      function handleSelect(e){
        if(input.Tipos.length >= 2){
          return alert(`No puedes agregar mas tipos.`)
        }
        setInput({
            ...input,
            Tipos: [...input.Tipos, e.target.value]
        })
    } 

    function handleDeleteType(e){
         setInput({
        ...input,
        Tipos: input.Tipos.filter((Tipo) => Tipo !== e)
      })
    }

    function handleInputChange(e) { 
        setInput({ 
          ...input, 
          [e.target.name]: e.target.value 
        });
        setError(validate({
          ...input,
          [e.target.name]: e.target.value
        }))
        console.log(input)
      };

  
    
    function handleSubmit(e) {    
        e.preventDefault();
        try {
          let encontrarNombre = allpokemons.every((e) => e.Nombre.toUpperCase() !== input.Nombre.toUpperCase())
          if(!encontrarNombre){
            return alert('Ya existe ese nombre')
          } else if(input.Tipos.length === 0) {
            return alert('Tienes que agregar un tipo')
          } else if(Object.keys(errors).length){
            return alert(Object.values(errors))
          } else {
         dispatch(postPokemon(input));
          setInput({
            Nombre: "",
            Vida: "",
            Ataque: "",
            Defensa: "",
            Velocidad: "",
            Altura: "",
            Peso: "",
            Tipos: [],
        })
         alert(`El pokemon se ha creado con exito.`) 
         history.push("/pokemons"); 
       }
        } catch (error) {
          console.log(error)
          return alert("Algo salio mal, Intenta nuevamete!")
        }
      };

     if(totalTypes.length === 0){
        return (
          <div>
            <Loading/>
          </div>
        )
      } else if(totalTypes.length !== 0){
    return(
        <div className={a.createcontainer}>
             
             
      <form className={a.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={a.infoform}>
            <h1 className={a.title}>¡Crea tu pokemon!</h1>

          <div>
            <label for="name">Nombre:</label>
            <input
              onChange={(e) => handleInputChange(e)}
              value={input.Nombre}
              name="Nombre"
              type="text"
              className={a.input}
              placeholder="Nombre de tu Pokemon..."
              required
            />
            {errors.Nombre && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Nombre}</div>
              </div>
            )}
          </div>

          <div>
            <label>Vida:</label>
            <input
              onChange={(e) => handleInputChange(e)}
              value={input.Vida}
              name="Vida"
              type="number"
              className={a.input}
              min="1"
              placeholder="Numero de vida..."
              required
            />
               {errors.Vida && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Vida}</div>
              </div>
            )}
          </div>
            
          <div>
          <label>Ataque:</label>
            <input
               onChange={(e) => handleInputChange(e)}
              value={input.Ataque}
              name="Ataque"
              type="number"
              min="1"
              placeholder="nivel de Ataque..."
              className={a.input}
              required
            />
               {errors.Ataque && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Ataque}</div>
              </div>
            )}
          </div>

          <div>
            <label>Defensa:</label>
            <input
               onChange={(e) => handleInputChange(e)}
              value={input.Defensa}
              name="Defensa"
              type="number"
              min="1"
              placeholder="nivel de Defensa..."
              className={a.input}
              required
            />
               {errors.Defensa && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Defensa}</div>
              </div>
            )}
          </div>
          
          <div>
            <label>Velocidad:</label>
            <input
              onChange={(e) => handleInputChange(e)}
              value={input.Velocidad}
              name="Velocidad"
              type="number"
              min="1"
              placeholder="Coloca la Velocidad..."
              className={a.input}
              required
            />
               {errors.Velocidad && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Velocidad}</div>
              </div>
            )}
          </div>



          <div>
            <label>Altura:</label>
            <input
             onChange={(e) => handleInputChange(e)}
              value={input.Altura}
              name="Altura"
              type="number"
              min="1"
              placeholder="Coloca su altura..."
              className={a.input}
              required
            />
               {errors.Altura && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Altura}</div>
              </div>
            )}
          </div>

          <div>
            <label>Peso:</label>
            <input
              onChange={(e) => handleInputChange(e)}
              value={input.Peso}
              name="Peso"
              type="number"
              min="1"
              placeholder="Coloca su Peso..."
              className={a.input}
              required
            />
               {errors.Peso && (
              <div className={a.errors}>
                 <div id="Nombre">{errors.Peso}</div>
              </div>
            )}
          </div>

          <div>
            <label>Tipos:</label>
            {
              input.Tipos.length === 0 ? (
                <p className={a.selectType}>Tienes para elegir 2 tipos!</p>
              ) : input.Tipos.length > 2 ? (
                <p className={a.selectType}> Maximo de Tipos: 2 </p>
              ) : input.Tipos.length === 1 ? (
                <p className={a.selectType}>Puedes elegir otro tipo</p>
              ) : null
            }
            <p className={a.typess}>
    
            <select className={a.Typ} onChange={(e) => handleSelect(e)}>
                {totalTypes.map((tipo) => (
                    <option value={tipo.ID}>{`${tipo.ID}: ${tipo.Nombre}`}</option>
                ))
                }
            </select>
            </p>
            <h5 className={a.deleteType}>
              {input.Tipos?.map((tipo) => (
                <p className={a.nameType}>
                  {`${tipo}`}
                  <button className={a.btnDelete} onClick={(e) => handleDeleteType(tipo)}>delete</button>
                </p>
              ))}
            </h5>
          </div>
        </div>
        <div className={a.BTNS}>
        <button className={a.btncreate} type="submit"> Crear Pokemon </button>
        <Link className={a.btncreate} to="/pokemons" style={{ textDecoration: "none" }}>
            Volver a Home
          </Link>
        </div>
      </form>
    </div>
    )
  }
}