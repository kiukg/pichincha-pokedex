import PokemonList from './Components/PokemonList/PokemonList';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';

function App() {
  return (
    <div className="App">
     <SearchPokemon></SearchPokemon>

     <PokemonList></PokemonList>

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
  );
}

export default App;
