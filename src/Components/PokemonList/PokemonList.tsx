import { PokemonActionsContainer, PokemonCell, PokemonContainer, PokemonHeader, PokemonRow, PokemonRowCell } from "./PokemonList.styled";
import editIcon from '../../icons/pencil.svg';
import deleteIcon from '../../icons/bin.svg';
import CustomButton from "../CustomButton/CustomButton";
import { useGlobalContext } from "../../context/context";
import { asyncFetch } from "../../utils/helpers";

export interface IPokemon {
    id: number;
    name: string;
    image?: string;
    attack?: number;
    defense?: number;
    hp?: number;
    type?: string;
}
export interface IPokemonList {
    pokemonList?: IPokemon[];
}

const PokemonList: React.FC<IPokemonList> = ({ pokemonList }) => {

    const { searchResult, setSelectedPokemon, setActionType, setSearchResult, setActionVisible, setAlertMsg, setAlertVisible } = useGlobalContext();

    const handleEdit = (event: any) => {
        const idValue = Number(event.target.id);
        setSelectedPokemon(searchResult.find((pokemon: IPokemon) => pokemon.id === idValue));
        setActionType('edit');
        setActionVisible(true);
    }

    const handleRemove = async (event: any) => {
        const headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        })

        const requestOptions = {
            method: 'DELETE',
            headers: headers,
        };

        const { statusCode } = await asyncFetch(requestOptions, '/' + event.target.id.toString());

        console.log(statusCode)

        if (statusCode === 200) {
            //Para no volver a consumir la api de listar actualizo el cambio (Eliminar Pokemon) hecho en el estado global
            const idValue = Number(event.target.id);
            setSearchResult((current: IPokemon[]) => current.filter((pokemon) => pokemon.id !== idValue));
            setAlertMsg(['Pokemon eliminado con exito','ok']);
            setAlertVisible(true);
        }
        else if (statusCode === 404) {
            setAlertMsg(['Pokemon no encontrado, no se puede eliminar','warning']);
            setAlertVisible(true);
        }
        else {
            setAlertMsg(['Error en la API','danger']);
            setAlertVisible(true);
        }

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
                pokemonList?.map(({ attack, defense, image: img, name, id }) => {
                    return (
                        <PokemonRow key={name + id}>
                            <PokemonRowCell>{name}</PokemonRowCell>
                            <PokemonRowCell><img height={96} src={img} alt={name}></img></PokemonRowCell>
                            <PokemonRowCell>{attack}</PokemonRowCell>
                            <PokemonRowCell>{defense}</PokemonRowCell>
                            <PokemonRowCell>
                                <PokemonActionsContainer>
                                    <CustomButton backgroundColor="#fff" color="#6161e9" id={id?.toString()} type="button" imgSrc={editIcon} onClick={handleEdit}></CustomButton>
                                    <CustomButton backgroundColor="#fff" color="#6161e9" id={id?.toString()} type="button" imgSrc={deleteIcon} onClick={handleRemove}></CustomButton>
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

