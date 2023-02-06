import { useGlobalContext } from "../../context/context";
import { PokemonCell, PokemonContainer, PokemonHeader, PokemonRow, PokemonRowCell } from "./PokemonList.styled";


export interface IPokemon {
    id: number;
    name?: string;
    img?: string;
    attack?: number;
    defense?: number;
}
export interface IPokemonList {
    pokemonList?: IPokemon[];
}

const PokemonList: React.FC<IPokemonList> = ({ pokemonList }) => {

    return (
        <PokemonContainer>
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
                            <PokemonRowCell>{name}</PokemonRowCell>
                            <PokemonRowCell><img src={img}></img></PokemonRowCell>
                            <PokemonRowCell>{attack}</PokemonRowCell>
                            <PokemonRowCell>{defense}</PokemonRowCell>
                            <PokemonRowCell>
                                <input type="button" value="Edit" /><input type="button" value="Delete" />
                            </PokemonRowCell>
                        </PokemonRow>
                    )
                })
            }
        </PokemonContainer>
    )
}

export default PokemonList;

