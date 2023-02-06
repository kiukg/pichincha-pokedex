import { useState } from 'react';
import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';
import { GlobalContext } from "./context/context";
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setsearchResult] = useState<any>([]);
  return (
    <GlobalContext.Provider value={{ searchValue, setSearchValue, searchResult, setsearchResult }}>
      <div className='App'>
        <SearchPokemon></SearchPokemon>

        <PokemonList pokemonList={searchResult}></PokemonList>

        <div>
          <span>Nuevo Pokemon</span>
          <div>
            <span>Nombre</span><input type="text" name="" id="" />
          </div>
          <div>
            <span>Imagen</span><input type="text" name="" id="" />
          </div>

          <div>
            <span>Ataque</span><input type="range" name="" id="" min='0' max='255' />
          </div>
          <div>
            <span>Defensa</span><input type="range" name="" id="" min='0' max='255' />
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
