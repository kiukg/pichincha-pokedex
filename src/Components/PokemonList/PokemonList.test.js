import { render, screen } from '@testing-library/react';

import PokemonList from './PokemonList';

describe('SearchPokemon', () => {
    it('renders appropriately', () => {
        render(<PokemonList pokemonList={[{ id: 1, name: 'bulbasaur', img: '', attack: 10, defense: 10 }]} />)
        expect(screen.getByText('bulbasaur')).toBeVisible();
    })

    // it("should return hooks", async () => {
    //     const wrapper = render(<PokemonList pokemonList={[{ id: 1, name: 'bulbasaur', img: '', attack: 10, defense: 10 }]} />)
    //     const { result } = renderHook(() => wrapper);
    //     const { searchResult } = result.current;
    // });
});




