import { PokemonCell, PokemonContainer, PokemonHeader, PokemonRow, PokemonRowCell } from "./PokemonList.styled";
import editIcon from '../../icons/pencil.svg';
import deleteIcon from '../../icons/bin.svg';

export interface IPokemon {
    id: number;
    name: string;
    img?: string;
    attack?: number;
    defense?: number;
}
export interface IPokemonList {
    pokemonList?: IPokemon[];
}

const PokemonList: React.FC<IPokemonList> = ({ pokemonList }) => {

    const handleEdit = (event: any) => {
        console.log(event.target.id)
    }

    const handleRemove = (event: any) => {
        console.log(event.target.id)
    }

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
                pokemonList?.map(({ attack, defense, img, name, id }) => {
                    return (
                        <PokemonRow key={name + id}>
                            <PokemonRowCell>{name}</PokemonRowCell>
                            <PokemonRowCell><img src={img} alt={name}></img></PokemonRowCell>
                            <PokemonRowCell>{attack}</PokemonRowCell>
                            <PokemonRowCell>{defense}</PokemonRowCell>
                            <PokemonRowCell>
                                <img width={20} id={id.toString()} src={editIcon} onClick={handleEdit}></img>
                                <img width={20} id={id.toString()} src={deleteIcon} onClick={handleRemove}></img>
                            </PokemonRowCell>
                        </PokemonRow>
                    )
                })
            }
        </PokemonContainer>
    )
}

export default PokemonList;

