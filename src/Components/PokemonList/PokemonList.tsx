import { PokemonCell, PokemonHeader, PokemonRow } from "./PokemonList.styled";

interface IPokemon {
    name?: string;
    img?: string;
    attack?: number;
    defense?: number;
}
interface IPokemonList {
    pokemonList?: IPokemon[];
    test?: any;
}

const PokemonList: React.FC<IPokemonList> = ({ pokemonList,test }) => {
    
    return (
        <>
            <PokemonHeader>
                <PokemonCell>Nombre</PokemonCell>
                <PokemonCell>Imagen</PokemonCell>
                <PokemonCell>Ataque</PokemonCell>
                <PokemonCell>Defensa</PokemonCell>
                <PokemonCell>Acciones</PokemonCell>
            </PokemonHeader>
            {
                pokemonList?.map(({ attack, defense, img, name }) => {
                    return (
                        <PokemonRow>
                            <PokemonCell>{name}</PokemonCell>
                            <PokemonCell>{img}</PokemonCell>
                            <PokemonCell>{attack}</PokemonCell>
                            <PokemonCell>{defense}</PokemonCell>
                            <PokemonCell>
                                <input type="button" value="Edit" /><input type="button" value="Delete" />
                            </PokemonCell>
                        </PokemonRow>
                    )
                })
            }
        </>
    )
}

export default PokemonList;

