import styled from "styled-components";

export const CustomButtonContainer = styled.div`
    padding: 7px 8px;
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: 3px;
    align-items: center;
    input { 
        border: 1px solid transparent;
        background: transparent;
    }
`

export const CustomButtonContainerNoText = styled.div`
    border-radius: 3px;
    align-items: center;
    width: max-content;
    input { 
        border: 1px solid transparent;
        background: transparent;
    }
`