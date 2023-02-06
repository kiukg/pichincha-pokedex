import { AddPokemon, SeachGrid, SearchGroup, SearchInput, SubmitSearch } from "./SeachPokemon.styled";


const SearchPokemon: React.FC = () => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let searchInputValue = formData.get("inpSearchPokemon") as string;

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchInputValue}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }

    return (
        <SeachGrid>
            <SearchGroup onSubmit={handleSubmit}>
                <label htmlFor='inpSearchPokemon'>Listado de Pokemon</label>
                <SearchInput>
                    <SubmitSearch type='submit' />
                    <AddPokemon name="inpSearchPokemon" type="search" placeholder="Buscar" />
                </SearchInput>
            </SearchGroup>
            <input type="button" value=" + Nuevo" />
        </SeachGrid>
    )
}

export default SearchPokemon;