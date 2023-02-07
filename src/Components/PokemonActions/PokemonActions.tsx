import { ActionTitle, PokemonActionsContainer, PokemonFieldContainer, PokemonInfoConfirm, PokemonInfoContainer } from "./PokemonActions.styled";
import saveIcon from '../../icons/floppy-disk.svg';
import cancelIcon from '../../icons/cross.svg';
import CustomButton from "../CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { IPokemon } from "../PokemonList/PokemonList";
import { useGlobalContext } from "../../context/context";

interface IAction {
    selectedPokemon?: IPokemon;
    actionType: 'add' | 'edit';
}

const PokemonActions: React.FC<IAction> = ({ selectedPokemon, actionType }) => {
    const [attkRange, setAttkRange] = useState<number | undefined>(0);
    const [defRange, setDefRange] = useState<number | undefined>(0);
    const [pokemonName, setPokemonName] = useState<string | undefined>('');
    const [pokemonImg, setPokemonImg] = useState<string | undefined>('');
    const { searchResult, setSearchResult } = useGlobalContext();

    useEffect(() => {
        if (actionType === 'add') {
            setAttkRange(0);
            setDefRange(0);
            setPokemonName('');
            setPokemonImg('');
        }
        else {
            setPokemonName(selectedPokemon?.name);
            setPokemonImg(selectedPokemon?.img);
            setAttkRange(selectedPokemon?.attack);
            setDefRange(selectedPokemon?.defense);
        }
    }, [selectedPokemon, actionType]);

    const handleAttkRange = (event: any) => {
        setAttkRange(event.target.value)
    }

    const handleDefRange = (event: any) => {
        setDefRange(event.target.value)
    }

    const handleNameChange = (event: any) => {
        setPokemonName(event.target.value)
    }
    const handleImgChange = (event: any) => {
        setPokemonImg(event.target.value)
    }
    const handleAddPokemon = (event: any) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let pokemonName = formData.get("pokemonName") as string;
        let pokemonAttk = formData.get("pokemonAttk") as string;
        let pokemonImg = formData.get("pokemonImg") as string;
        let pokemonDef = formData.get("pokemonDef") as string;

        if (actionType === 'add') {
            setSearchResult((current: IPokemon[]) => [...current, { id: current.length + 1, name: pokemonName, attack: pokemonAttk, defense: pokemonDef, img: pokemonImg }]);
        }
        else {
            const currentPokemonList = [...searchResult];
            let foundPokemonIndex = currentPokemonList.findIndex((pokemon: IPokemon) => pokemon.id === selectedPokemon?.id);
            currentPokemonList[foundPokemonIndex] = { id: selectedPokemon?.id, name: pokemonName, attack: pokemonAttk, defense: pokemonDef, img: pokemonImg };
            setSearchResult(currentPokemonList);
        }
    }

    return (
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
                    <input type="range" name="pokemonAttk" id="" min='0' max='255' onInput={handleAttkRange} value={attkRange}
                    />{attkRange}
                </PokemonFieldContainer>


                <PokemonFieldContainer htmlFor="pokemonImg">
                    Imagen:
                    <input type="text" name="pokemonImg" id="" title="Imagen" placeholder="URL"
                        value={pokemonImg}
                        onChange={handleImgChange} />
                </PokemonFieldContainer>

                <PokemonFieldContainer htmlFor="pokemonDef">
                    Defensa: 0<input type="range" name="pokemonDef" id="" min='0' max='255' onInput={handleDefRange} value={defRange}
                    />{defRange}
                </PokemonFieldContainer>
            </PokemonInfoContainer>
            <PokemonInfoConfirm>
                <CustomButton backgroundColor="#6161e9" color="#fff" text="Guardar" imgSrc={saveIcon} type='submit'></CustomButton>
                <CustomButton backgroundColor="#6161e9" color="#fff" text="Cancelar" imgSrc={cancelIcon} type='button'></CustomButton>
            </PokemonInfoConfirm>
        </PokemonActionsContainer >
    )
}

export default PokemonActions;

