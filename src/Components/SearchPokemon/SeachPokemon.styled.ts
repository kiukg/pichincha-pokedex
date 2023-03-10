import styled from "styled-components";

export const SeachGrid = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: end;
    justify-content: space-between;
    margin: 16px;
`
export const SearchLabel = styled.label`
    margin:16px 0;
`

export const SearchIcon = styled.input`
    padding: 7px 8px;
    border: 1px solid transparent;
    background: transparent;
    outline:0;
    ::placeholder {
        color: #e3e3e3;
    }
`
export const SearchInput = styled.div`
    border:1px solid #e3e3e3;
    border-radius: 3px;
`
export const SubmitSearch = styled.input`
    text-indent: -999px;
    overflow: hidden;
    width: 22px;
    padding: 0;
    margin: 0 0 0 4px;
    border: 1px solid transparent;
    border-radius: inherit;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
    cursor: pointer;
    opacity: 0.7;
  `

export const SearchGroup = styled.form`
    display: grid;
`