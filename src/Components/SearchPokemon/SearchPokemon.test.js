import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SearchPokemon from './SearchPokemon';
import 'isomorphic-fetch';

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



test('should get pokemon bulbasaur', async () => {
  render(<SearchPokemon />);

  const getButton = screen.getByTestId('btnSearch');
  expect(getButton).not.toBeDisabled();
  userEvent.click(getButton);

  const res = await fetch('https://pokeapi.co/api/v2/pokemon/1');
  const result = await res.json();

  expect(result.name).toBe('bulbasaur');  

  // expect(windowFetchSpy).toHaveBeenCalled();
  // expect(windowFetchSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon');
  // expect(screen.getByText('bulbasaur')).toBeVisible();

});

