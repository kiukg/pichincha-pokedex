import { useEffect, useState } from 'react';
import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';
import { GlobalContext } from "./context/context";
import './App.css'
import PokemonActions from './Components/PokemonActions/PokemonActions';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>([]);
  const [actionType, setActionType] = useState<'add' | 'edit'>('add');
  const [actionVisible, setActionVisible] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<[string, 'warning' | 'ok' | 'danger']>(['', 'ok']);
  const [isAlertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(function () {
      setAlertVisible(false)
    }, 2000);
  },[isAlertVisible]);

  return (
    <GlobalContext.Provider value={{ searchValue, setSearchValue, searchResult, setSearchResult, selectedPokemon, setSelectedPokemon, actionType, setActionType, actionVisible, setActionVisible, alertMsg, setAlertMsg, isAlertVisible, setAlertVisible }}>
      <div className='App'>
        <SearchPokemon></SearchPokemon>
        <PokemonList pokemonList={searchResult}></PokemonList>
        <PokemonActions actionType={actionType} selectedPokemon={selectedPokemon} visible={actionVisible}></PokemonActions>
      </div>
      <div className={`messageBox ${alertMsg[1]} ${isAlertVisible ? 'showMsg' : 'hideMsg'}`}>
        <span>{alertMsg[0]}</span>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
