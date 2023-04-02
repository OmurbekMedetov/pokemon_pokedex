import { useDispatch, useSelector } from 'react-redux';
import PropTypes, { useEffect, useState } from 'react';
import lodash from 'lodash';

import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { GetPokemonList } from '../actions/ActionCreatorPokemon';

function PokemonList(props) {
  const { history } = props;
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const PokemonListState = useSelector((state) => state.PokemonList);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };
  useEffect(() => {
    FetchData(1);
  }, []);

  const showData = () => {
    if (PokemonListState.Loading) {
      <p>Loading...</p>;
    }

    if (!lodash.isEmpty(PokemonListState.data)) {
      return (
        <div className="list-wrapper">
          {PokemonListState.data.map((el) => (
            <div className="pokemon-item" key={el.id}>
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
        <button type="button" onClick={() => history.push(`/pokemon/${search}`)}>
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
PokemonList.defaultProps = {
  history: 'history',
};
PokemonList.propTypes = {
  history: PropTypes.string,
};
export default PokemonList;
