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
    const { searchResult, setSearchResult, setActionVisible } = useGlobalContext();

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

    const handleAttkRange = (event: any) => {
        setAttkRange(event.target.value)
    }

    const handleDefRange = (event: any) => {
        setDefRange(event.target.value)
    }

    const handleHPRange = (event: any) => {
        setHPRange(event.target.value)
    }

    const handleNameChange = (event: any) => {
        setPokemonName(event.target.value)
    }
    const handleImgChange = (event: any) => {
        setPokemonImg(event.target.value)
    }
    const handleTypeChange = (event: any) => {
        setPokemonType(event.target.value)
    }

    const handleCancel = ()=> {
        setActionVisible(false);
    }
    
    const handleAddPokemon = async (event: any) => {
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
                setSearchResult((current: IPokemon[]) => [...current, { id: response.id, name: response.name, attack: response.attack, defense: response.defense, hp: response.hp, type: response.type, image: response.image }]);
                setActionVisible(false);
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
                const currentPokemonList = [...searchResult];
                let foundPokemonIndex = currentPokemonList.findIndex((pokemon: IPokemon) => pokemon.id === selectedPokemon?.id);
                currentPokemonList[foundPokemonIndex] = { id: selectedPokemon?.id, name: response.name, attack: response.attack, defense: response.defense, hp: response.hp, type: response.type, image: response.image };
                setSearchResult(currentPokemonList);
                setActionVisible(false);
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
                            onChange={handleNameChange} />
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonAttk">
                        Ataque: 0
                        <input type="range" name="pokemonAttk" min='0' max='255' onInput={handleAttkRange} value={attkRange}
                        />{attkRange}
                    </PokemonFieldContainer>


                    <PokemonFieldContainer htmlFor="pokemonImg">
                        Imagen:
                        <input type="text" name="pokemonImg" title="Imagen" placeholder="URL"
                            value={pokemonImg}
                            onChange={handleImgChange} />
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonDef">
                        Defensa: 0<input type="range" name="pokemonDef" min='0' max='255' onInput={handleDefRange} value={defRange}
                        />{defRange}
                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonType">
                        Tipo:
                        <select name="pokemonType" value={pokemonType} onChange={handleTypeChange}>
                            <option value="Agua">Agua</option>
                            <option value="Acero">Acero</option>
                            <option value="Bicho">Bicho</option>
                            <option value="Dragón">Dragón</option>
                            <option value="Eléctrico">Eléctrico</option>
                            <option value="Fantasma">Fantasma</option>
                            <option value="Fuego">Fuego</option>
                            <option value="Hada">Hada</option>
                            <option value="Hielo">Hielo</option>
                            <option value="Lucha">Lucha</option>
                            <option value="Normal">Normal</option>
                            <option value="Planta">Planta</option>
                            <option value="Psíquico">Psíquico</option>
                            <option value="Roca">Roca</option>
                            <option value="Siniestro">Siniestro</option>
                            <option value="Tierra">Tierra</option>
                            <option value="Veneno">Veneno</option>
                            <option value="Volador">Volador</option>
                        </select>

                    </PokemonFieldContainer>

                    <PokemonFieldContainer htmlFor="pokemonHP">
                        HP: 0<input type="range" name="pokemonHP" min='0' max='255' onInput={handleHPRange} value={HPRange}
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

