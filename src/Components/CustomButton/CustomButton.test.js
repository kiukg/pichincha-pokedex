import { render, screen } from '@testing-library/react';
import icon from '../../icons/bin.svg'
import CustomButton from './CustomButton';

describe('SearchPokemon', () => {
    it('renders appropriately', () => {
        render(<CustomButton text='Test' backgroundColor='red' color='white' type='button' id='testId' />)
        expect(screen.getByText('Test')).toBeVisible();
    })
    it('renders appropriately', () => {
        render(<CustomButton text='Test' backgroundColor='red' color='white' type='button' id='testId' imgSrc={icon} />)
        const flagImages = screen.getByTestId('testId');
        expect(flagImages).toHaveClass('img');
    })

});




