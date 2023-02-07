import { render, screen } from '@testing-library/react';

import CustomButton from './CustomButton';

describe('SearchPokemon', () => {
    it('renders appropriately', () => {
        render(<CustomButton text='Test' backgroundColor='red' color='white' type='button' id='testId'/>)
        expect(screen.getByText('Test')).toBeVisible();
    })
});




