import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Componentes/Home/Home.jsx';
import Landing from './Componentes/Landing/Landing';
import Details from './Componentes/Details/Details';
import Create from './Componentes/Create/Create';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Landing}/>
        <Route path='/pokemons' component={Home}/> 
        <Route path='/pokemonsdetail/:id' component={Details}/>
        <Route path='/create' component={Create}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
