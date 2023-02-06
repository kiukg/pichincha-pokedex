import { SearchIcon, SeachGrid, SearchGroup, SearchInput, SubmitSearch, AddPokemon, SearchLabel } from "./SeachPokemon.styled";
import { useGlobalContext } from '../../context/context';
import { IPokemon } from '../PokemonList/PokemonList';


const SearchPokemon: React.FC = () => {
    const { setSearchValue, setsearchResult } = useGlobalContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let searchInputValue = formData.get("inpSearchPokemon") as string;

        setSearchValue(searchInputValue);

        await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInputValue}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then(async (data) => {
                let test: IPokemon[] = [];
                if (!data.results) {
                    test.push({ id: data.id, name: data.species.name, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, img: data.sprites.front_default })
                }
                else {


                    await Promise.all(
                        data.results.map(async (pokemon: any) => {
                            await fetch(pokemon.url, {
                                method: 'get',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },

                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    test.push({ id: data.id, name: data.species.name, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, img: data.sprites.front_default });
                                })
                        }))
                }
                const sorted: { id: number }[] = test?.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    }

                    if (a.id < b.id) {
                        return -1;
                    }

                    return 0;
                })
                setsearchResult(sorted);
            });
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
            <AddPokemon type="button" value=" + Nuevo" />
        </SeachGrid>
    )
}

export default SearchPokemon;