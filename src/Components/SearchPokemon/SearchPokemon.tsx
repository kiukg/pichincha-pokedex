import { SearchIcon, SeachGrid, SearchGroup, SearchInput, SubmitSearch, AddPokemon } from "./SeachPokemon.styled";
import { useGlobalContext } from '../../context/context'


const SearchPokemon: React.FC = () => {
    const { searchValue,setSearchValue,searchResult,setsearchResult } = useGlobalContext();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let searchInputValue = formData.get("inpSearchPokemon") as string;

        setSearchValue(searchInputValue);

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                setsearchResult(data);
            });
    }
  
    return (
        <SeachGrid>
            <SearchGroup onSubmit={handleSubmit}>
                <label htmlFor='inpSearchPokemon'>Listado de Pokemon</label>
                <SearchInput>
                    <SubmitSearch type='submit' />
                    <SearchIcon name="inpSearchPokemon" type="search" placeholder="Buscar" />
                </SearchInput>
            </SearchGroup>
            <AddPokemon type="button" value=" + Nuevo" />
        </SeachGrid>
    )
}

export default SearchPokemon;