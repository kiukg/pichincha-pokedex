import styled from "styled-components";

export const PokemonContainer = styled.div`
    margin: 16px;
    max-height: 50vh;
    overflow: auto;
    border: 1px solid #e3e3e3;
`

export const PokemonRow = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: end;
    justify-content: center;
    min-width: 580px;
`

export const PokemonHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: end;
    justify-content: center;
    min-width: 580px;
`

export const PokemonCell = styled.div`
    border: 1px solid #e3e3e3;
    padding: 8px
`

export const PokemonRowCell = styled.div`
    display: grid;
    align-items: center;
    border: 1px solid #e3e3e3;
    padding: 8px;
    height: 96px;
`
export const PokemonActionsContainer = styled.div`
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    justify-content: space-evenly;
`
