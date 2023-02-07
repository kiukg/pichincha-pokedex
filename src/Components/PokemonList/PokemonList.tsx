import { PokemonActionsContainer, PokemonCell, PokemonContainer, PokemonHeader, PokemonRow, PokemonRowCell } from "./PokemonList.styled";
import editIcon from '../../icons/pencil.svg';
import deleteIcon from '../../icons/bin.svg';
import CustomButton from "../CustomButton/CustomButton";
import { useGlobalContext } from "../../context/context";

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

    const { searchResult, setSelectedPokemon, setActionType, setSearchResult } = useGlobalContext();

    const handleEdit = (event: any) => {
        const idValue = Number(event.target.id);
        setSelectedPokemon(searchResult.find((pokemon: IPokemon) => pokemon.id === idValue));
        setActionType('edit');
    }

    const handleRemove = (event: any) => {
        const idValue = Number(event.target.id);
        setSearchResult((current: IPokemon[]) => current.filter((pokemon) => pokemon.id !== idValue));
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
                                <PokemonActionsContainer>
                                    <CustomButton backgroundColor="#fff" color="#6161e9" id={id.toString()} type="button" imgSrc={editIcon} onClick={handleEdit}></CustomButton>
                                    <CustomButton backgroundColor="#fff" color="#6161e9" id={id.toString()} type="button" imgSrc={deleteIcon} onClick={handleRemove}></CustomButton>
                                </PokemonActionsContainer>
                            </PokemonRowCell>
                        </PokemonRow>
                    )
                })
            }
        </PokemonContainer>
    )
}

export default PokemonList;

