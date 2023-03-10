import { ActionTitle, PokemonActionsContainer, PokemonFieldContainer, PokemonInfoConfirm, PokemonInfoContainer } from "./PokemonActions.styled";
import saveIcon from '../../icons/floppy-disk.svg';
import cancelIcon from '../../icons/cross.svg';
import CustomButton from "../CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { IPokemon } from "../PokemonList/PokemonList";
import { useGlobalContext } from "../../context/context";
import { asyncFetch } from "../../utils/helpers";

interface IAction {
    selectedPokemon?: IPokemon;
    actionType: 'add' | 'edit';
    visible: boolean;
}

const PokemonActions: React.FC<IAction> = ({ selectedPokemon, actionType, visible }) => {
    const [attkRange, setAttkRange] = useState<number | undefined>(0);
    const [defRange, setDefRange] = useState<number | undefined>(0);
    const [HPRange, setHPRange] = useState<number | undefined>(0);
    const [pokemonName, setPokemonName] = useState<string | undefined>('');
    const [pokemonImg, setPokemonImg] = useState<string | undefined>('');
    const [pokemonType, setPokemonType] = useState<string | undefined>('');
    const { searchResult, setSearchResult, setActionVisible ,setAlertMsg, setAlertVisible} = useGlobalContext();

    useEffect(() => {
        if (actionType === 'add') {
            setAttkRange(0);
            setDefRange(0);
            setHPRange(0);
            setPokemonName('');
            setPokemonImg('');
            setPokemonType('');
        }
        else {
            setPokemonName(selectedPokemon?.name);
            setPokemonImg(selectedPokemon?.image);
            setAttkRange(selectedPokemon?.attack);
            setDefRange(selectedPokemon?.defense);
            setHPRange(selectedPokemon?.hp);
            setPokemonType(selectedPokemon?.type);
        }
    }, [selectedPokemon, actionType, visible]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.name) {
            case 'pokemonName':
                setPokemonName(event.target.value);
                break;
            case 'pokemonAttk':
                setAttkRange(Number(event.target.value));
                break;
            case 'pokemonDef':
                setDefRange(Number(event.target.value));
                break;
            case 'pokemonHP':
                setHPRange(Number(event.target.value));
                break;
            case 'pokemonImg':
                setPokemonImg(event.target.value);
                break;
            case 'pokemonType':
                setPokemonType(event.target.value);
                break;
            default:
                console.log(`Invalid`);
        }
    }

    const handleCancel = () => {
        setActionVisible(false);
    }

    const handleAddPokemon = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let pokemonName = formData.get("pokemonName") as string;
        let pokemonAttk = formData.get("pokemonAttk") as string;
        let pokemonImg = formData.get("pokemonImg") as string;
        let pokemonDef = formData.get("pokemonDef") as string;
        let pokemonHP = formData.get("pokemonHP") as string;
        let pokemonType = formData.get("pokemonType") as string;

        const headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        })

        const bodyRequest = {
            name: pokemonName,
            image: pokemonImg,
            attack: pokemonAttk,
            defense: pokemonDef,
            hp: pokemonHP,
            type: pokemonType,
            idAuthor: 1
        }

        if (actionType === 'add') {

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(bodyRequest)
            };

            const { responseJson: response, statusCode } = await asyncFetch(requestOptions);

            if (statusCode === 201) {
                //Para no volver a consumir la api de listar actualizo el cambio (Agregar Pokemon) hecho en el estado global
                setSearchResult((current: IPokemon[]) => [...current, { id: response.id, name: response.name, attack: response.attack, defense: response.defense, hp: response.hp, type: response.type, image: response.image }]);
                setActionVisible(false);
                setAlertMsg(['Pokemon creado correctamente', 'ok']);
                setAlertVisible(true);
            }
            else if (statusCode === 402) {
                setAlertMsg(['Faltan datos para crear el Pokemon', 'warning']);
                setAlertVisible(true);
            }
            else {
                setAlertMsg(['Error en la API', 'danger']);
                setAlertVisible(true);
            }
        }
        else {
            const requestOptions = {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(bodyRequest)
            };

            const { responseJson: response, statusCode } = await asyncFetch(requestOptions, '/' + selectedPokemon?.id.toString());

            if (statusCode === 200) {
                //Para no volver a consumir la api de listar actualizo el cambio (Modificar Pokemon) hecho en el estado global
                const currentPokemonList = [...searchResult];
                let foundPokemonIndex = currentPokemonList.findIndex((pokemon: IPokemon) => pokemon.id === selectedPokemon?.id);
                currentPokemonList[foundPokemonIndex] = { id: selectedPokemon?.id, name: response.name, attack: response.attack, defense: response.defense, hp: response.hp, type: response.type, image: response.image };
                setSearchResult(currentPokemonList);
                setActionVisible(false);
                setAlertMsg(['Pokemon modificado correctamente', 'ok']);
                setAlertVisible(true);
            }
            else if (statusCode === 404) {
                setAlertMsg(['Pokemon no encontrado, no se puede modificar', 'warning']);
                setAlertVisible(true);
            }
            else {
                setAlertMsg(['Error en la API', 'danger']);
                setAlertVisible(true);
            }
        }
    }

    return (
        visible ?
            <PokemonActionsContainer onSubmit={handleAddPokemon}>
                <ActionTitle>{actionType === "add" ? "Nuevo Pokemon" : `Editando a ${selectedPokemon?.name}`}</ActionTitle>
                <PokemonInfoContainer>
                    <PokemonFieldContainer htmlFor="pokemonName">
                        Nombre:
                        <input type="text" name="pokemonName" title="Nombre" placeholder="Nombre"
                            value={pokemonName}
                            onChange={handleChange} />
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonAttk">
                        Ataque: 0
                        <input type="range" name="pokemonAttk" min='0' max='255' onChange={handleChange} value={attkRange}
                        />{attkRange}
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonImg">
                        Imagen:
                        <input type="text" name="pokemonImg" title="Imagen" placeholder="URL"
                            value={pokemonImg}
                            onChange={handleChange} />
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonDef">
                        Defensa: 0<input type="range" name="pokemonDef" min='0' max='255' onChange={handleChange} value={defRange}
                        />{defRange}
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonType">
                        Tipo:
                        <select name="pokemonType" value={pokemonType} onChange={handleChange} defaultValue={0}>
                            <option value="0">Selecciona el tipo</option>
                            <option value="Agua">Agua</option>
                            <option value="Acero">Acero</option>
                            <option value="Bicho">Bicho</option>
                            <option value="Drag??n">Drag??n</option>
                            <option value="El??ctrico">El??ctrico</option>
                            <option value="Fantasma">Fantasma</option>
                            <option value="Fuego">Fuego</option>
                            <option value="Hada">Hada</option>
                            <option value="Hielo">Hielo</option>
                            <option value="Lucha">Lucha</option>
                            <option value="Normal">Normal</option>
                            <option value="Planta">Planta</option>
                            <option value="Ps??quico">Ps??quico</option>
                            <option value="Roca">Roca</option>
                            <option value="Siniestro">Siniestro</option>
                            <option value="Tierra">Tierra</option>
                            <option value="Veneno">Veneno</option>
                            <option value="Volador">Volador</option>
                        </select>

                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonHP">
                        HP: 0<input type="range" name="pokemonHP" min='0' max='255' onChange={handleChange} value={HPRange}
                        />{HPRange}
                    </PokemonFieldContainer>

                </PokemonInfoContainer>
                <PokemonInfoConfirm>
                    <CustomButton backgroundColor="#6161e9" color="#fff" text="Guardar" imgSrc={saveIcon} type='submit'></CustomButton>
                    <CustomButton backgroundColor="#6161e9" color="#fff" text="Cancelar" imgSrc={cancelIcon} type='button' onClick={handleCancel}></CustomButton>
                </PokemonInfoConfirm>
            </PokemonActionsContainer > : <></>
    )
}

export default PokemonActions;
