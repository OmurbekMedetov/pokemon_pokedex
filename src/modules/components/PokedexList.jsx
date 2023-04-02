/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { GetPokemonList } from '../actions/ActionCreatorPokemon';

function PokemonList(props) {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const PokemonListState = useSelector((state) => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const showData = () => {
    if (PokemonListState.Loading) {
      <p>Loading...</p>;
    }

    if (!lodash.isEmpty(PokemonListState.data)) {
      return (
        <div className="list-wrapper">
          {PokemonListState.data.map((el) => (
            <div className="pokemon-item">
              <p>{el.name}</p>
              <div className="bottom-color">
                <Link to={`/pokemon/${el.name}`}>посмотреть</Link>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (PokemonListState.errorMsg !== '') {
      return <p>{PokemonListState.errorMsg}</p>;
    }

    return <div className="loader" />;
  };

  return (
    <div>
      <div className="search-wrapper">
        <input type="text" placeholder="Поиск покемона" onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={() => props.history.push(`/pokemon/${search}`)}>
          Поиск
        </button>
      </div>
      {showData()}
      {!lodash.isEmpty(PokemonListState.data) && (
        <Pagination defaultCurrent={1} total={50} onChange={(data) => FetchData(data + 1)} />
      )}
    </div>
  );
}

export default PokemonList;
