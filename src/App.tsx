import { useState } from 'react';
import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';
import { GlobalContext } from "./context/context";
import './App.css'
import PokemonActions from './Components/PokemonActions/PokemonActions';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>([]);
  const [actionType, setActionType] = useState<'add'|'edit'>('add');
  return (
    <GlobalContext.Provider value={{ searchValue, setSearchValue, searchResult,setSearchResult,selectedPokemon, setSelectedPokemon, actionType, setActionType}}>
      <div className='App'>
        <SearchPokemon></SearchPokemon>
        <PokemonList pokemonList={searchResult}></PokemonList>
        <PokemonActions actionType={actionType} selectedPokemon={selectedPokemon}></PokemonActions>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
