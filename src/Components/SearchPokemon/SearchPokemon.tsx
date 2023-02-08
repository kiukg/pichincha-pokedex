import { SearchIcon, SeachGrid, SearchGroup, SearchInput, SubmitSearch, SearchLabel } from "./SeachPokemon.styled";
import { useGlobalContext } from '../../context/context';
import { IPokemon } from '../PokemonList/PokemonList';
import CustomButton from "../CustomButton/CustomButton";
import addIcon from '../../icons/plus.svg';
import { asyncFetch } from "../../utils/helpers";

export const getPokemon = async (url: string, headers: Headers) => {
    const response = await (await asyncFetch(headers, url)).responseJson;

    let pokemonList: IPokemon[] = [];

    if (response.length > 0) {
        response.map((pokemon: IPokemon) => {
            pokemonList.push({ id: pokemon?.id, name: pokemon?.name, attack: pokemon?.attack, defense: pokemon?.defense, image: pokemon?.image, hp: pokemon?.hp, type: pokemon?.type });
            return pokemon;
        })
    }
    else {
        pokemonList.push({ id: response?.id, name: response?.name, attack: response?.attack, defense: response?.defense, image: response?.image, hp: response?.hp, type: response?.type })
    }
    return pokemonList;
}

const SearchPokemon: React.FC = () => {
    const { setSearchValue, setSearchResult, setActionType, setActionVisible } = useGlobalContext();
    const handleAddAction = () => {
        setActionType('add');
        setActionVisible(true);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let searchInputValue = formData.get("inpSearchPokemon") as string;

        setSearchValue(searchInputValue);

        const headers: Headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        });
        const url = searchInputValue !== '' ? `/${searchInputValue}` : `/?idAuthor=1`;

        const pokemonList = await getPokemon(url, headers);

        const sorted: { id: number }[] = pokemonList?.sort((currentPkm, prevPkm) => {
            if (currentPkm.id > prevPkm.id) {
                return 1;
            }
            if (currentPkm.id < prevPkm.id) {
                return -1;
            }
            return 0;
        })
        setSearchResult(sorted);
    }

    return (
        <SeachGrid>
            <SearchGroup onSubmit={handleSubmit}>
                <SearchLabel htmlFor='inpSearchPokemon'>Listado de Pokemon</SearchLabel>
                <SearchInput>
                    <SubmitSearch data-testid='btnSearch' name='btnSearch' type='submit' />
                    <SearchIcon name="inpSearchPokemon" type="search" placeholder="Buscar" />
                </SearchInput>
            </SearchGroup>
            <CustomButton backgroundColor="#6161e9" color="#fff" text="Nuevo" type="button" imgSrc={addIcon} onClick={handleAddAction}></CustomButton>
        </SeachGrid>
    )
}

export default SearchPokemon;