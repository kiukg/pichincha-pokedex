import { SearchIcon, SeachGrid, SearchGroup, SearchInput, SubmitSearch, SearchLabel } from "./SeachPokemon.styled";
import { useGlobalContext } from '../../context/context';
import { IPokemon } from '../PokemonList/PokemonList';
import CustomButton from "../CustomButton/CustomButton";
import addIcon from '../../icons/plus.svg';
import { asyncFetch } from "../../utils/helpers";

export const getPokemon = async (url: string, headers: Headers) => {

    const response = await asyncFetch(url, headers);

    let pokemonList: IPokemon[] = [];

    if (!response?.results) {
        pokemonList.push({ id: response?.id, name: response?.species.name, attack: response?.stats[1].base_stat, defense: response?.stats[2].base_stat, img: response?.sprites.front_default })
    }
    else {
        await Promise.all(
            response?.results.map(async (pokemon: any) => {
                const response = await asyncFetch(pokemon.url, headers);
                pokemonList.push({ id: response?.id, name: response?.species.name, attack: response?.stats[1].base_stat, defense: response?.stats[2].base_stat, img: response?.sprites.front_default });
            }))
    }

    const sorted: { id: number }[] = pokemonList?.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        }

        if (a.id < b.id) {
            return -1;
        }

        return 0;
    })

    return sorted;
}

const SearchPokemon: React.FC = () => {
    const { setSearchValue, setSearchResult, setActionType } = useGlobalContext();

    const handleAddAction = () => {
        setActionType('add');
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
        const url = `https://pokeapi.co/api/v2/pokemon/${searchInputValue}`;

        const pokemonList = await getPokemon(url, headers);

        setSearchResult(pokemonList);
    }

    return (
        <SeachGrid>
            <SearchGroup onSubmit={handleSubmit}>
                <SearchLabel htmlFor='inpSearchPokemon'>Listado de Pokemon</SearchLabel>
                <SearchInput>
                    <SubmitSearch type='submit' />
                    <SearchIcon name="inpSearchPokemon" type="search" placeholder="Buscar" />
                </SearchInput>
            </SearchGroup>
            <CustomButton backgroundColor="#6161e9" color="#fff" text="Nuevo" type="button" imgSrc={addIcon} onClick={handleAddAction}></CustomButton>
        </SeachGrid>
    )
}

export default SearchPokemon;