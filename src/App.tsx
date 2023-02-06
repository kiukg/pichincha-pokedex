import { useState } from 'react';
import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';
import { GlobalContext } from "./context/context";
import './App.css'
import PokemonActions from './Components/PokemonActions/PokemonActions';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setsearchResult] = useState<any>([]);
  return (
    <GlobalContext.Provider value={{ searchValue, setSearchValue, searchResult, setsearchResult }}>
      <div className='App'>
        <SearchPokemon></SearchPokemon>
        <PokemonList pokemonList={searchResult}></PokemonList>
        <PokemonActions></PokemonActions>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
