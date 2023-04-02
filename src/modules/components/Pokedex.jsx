/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import { useEffect } from 'react';
import { GetPokemon } from '../actions/ActionCreatorPokemon';

function Pokemon(props) {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  function ShowData() {
    if (!lodash.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className="pokemon-wrapper">
          <div className="image">
            <h1>Sprites</h1>
            <img src={pokeData.sprites.front_default} alt="" />
            <img src={pokeData.sprites.back_default} alt="" />
            <img src={pokeData.sprites.front_shiny} alt="" />
            <img src={pokeData.sprites.back_shiny} alt="" />
          </div>
          <div className="stat-abi">
            <div className="stats">
              <h1>Stats</h1>
              {pokeData.stats.map((el) => (
                <div className="stats-bar">
                  <label htmlFor="label">{el.stat.name}</label>
                  <progress max="100" value={el.base_stat} />
                </div>
              ))}
            </div>
            <div className="ability">
              <h1>Abilities</h1>
              {pokeData.abilities.map((el) => (
                <p>{el.ability.name}</p>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <div className="loader" />;
    }

    if (pokemonState.errorMsg !== '') {
      return <p className="errorPokemon">Данный покемон не найден!</p>;
    }

    return <p>error getting pokemon</p>;
  }

  return (
    <div className="poke">
      <h1>{pokemonName}</h1>
      <ShowData />
    </div>
  );
}

export default Pokemon;
