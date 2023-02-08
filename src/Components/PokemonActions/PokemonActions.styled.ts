import styled from "styled-components";

export const PokemonActionsContainer = styled.form`
    margin: 16px;
    border: 1px solid #e3e3e3;
`

export const ActionTitle = styled.div`
    margin: 16px;
    text-align: center;
`
export const PokemonInfoContainer = styled.div`
    margin: 16px;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;

    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }

`
export const PokemonFieldContainer = styled.label`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 100px 1fr 30px;
    width: 100%;
    input[type=text], select {
        padding: 7px 8px;
        border:1px solid #e3e3e3;
        border-radius: 3px;
        width: 100%;
        grid-column: 2/-1;
        box-sizing: border-box;
    }

    input[type=range] {
        background-color: #6161e9;
        -webkit-appearance: none;
        border: solid 1px #6161e9;
        border-radius: 8px;
        height: 4px;
        accent-color: #6161e9;
        width: 100%;
}
`

export const PokemonInfoConfirm = styled.div`
    margin-bottom: 16px;
    display: grid;
    justify-items: center;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 16px;
`