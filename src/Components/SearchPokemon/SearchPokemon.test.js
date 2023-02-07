import { render, screen, waitFor } from '@testing-library/react';
import SearchPokemon, { getPokemon } from './SearchPokemon';
import PokemonList from '../../Components/PokemonList/PokemonList';
import * as api from "../../utils/helpers";

const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

jest.mock("../../utils/helpers");

describe('SearchPokemon', () => {
  it('renders appropriately', () => {
    render(<SearchPokemon />)
    expect(screen.getByText(/Listado de Pokemon/i)).toBeInTheDocument()
  })

  // it("should return the initial values for data, error and loading", async () => {
  //   const { result } = renderHook(() => SearchPokemon());
  //   const { setSearchValue, setSearchResult, setActionType } = result.current;

  //   console.log(result)
  // });
});

describe('getPokemon', () => {
  beforeEach(() => jest.clearAllMocks());


  it("should render pokemon names when api responds", async () => {

    const test =await api.getPokemonsFromApi.mockResolvedValue({
      results: [{ name: "bulbasaur" }],
    });

    console.log(test)
    
    render(<PokemonList pokemonList={test}/>);
    // See if the pokemon name we returned in the mock is visible
    await waitFor(() => {
      screen.getByText("bulbasaur");
    });
  });
});