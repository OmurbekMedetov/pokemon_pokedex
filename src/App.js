import './App.css';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import PokemonList from './modules/components/PokedexList';
import Pokemon from './modules/components/Pokedex';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
      <Switch className="switch">
        <Route path="/" exact component={PokemonList} />
        <Route path="/pokemon/:pokemon" exact component={Pokemon} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
