/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import PokemonListReducer from './PokemonList';
import PokemonMultipleReducer from './PokemonMultiple';

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  Pokemon: PokemonMultipleReducer,
});

export default RootReducer;
