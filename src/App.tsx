import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPokemon from './Components/SearchPokemon/SearchPokemon';

function App() {
  return (
    <div className="App">
     <SearchPokemon></SearchPokemon>

      <div>
        <div>
          <div>Nombre</div><div>Imagen</div><div>Ataque</div><div>Defensa</div><div>Acciones</div>
          <div>Ivysaur</div><div>IMG</div><div>65</div><div>38</div><div><input type="button" value="Edit" /><input type="button" value="Delete" /></div>
        </div>
      </div>

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
