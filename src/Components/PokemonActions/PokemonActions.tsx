import { PokemonActionsContainer } from "./PokemonActions.styled";


const PokemonActions: React.FC = () => {

    return (
        <PokemonActionsContainer>
            <span>Nuevo Pokemon</span>
            <div>
                <span>Nombre</span><input type="text" name="" id="" />
            </div>
            <div>
                <span>Imagen</span><input type="text" name="" id="" />
            </div>

            <div>
                <span>Ataque</span><input type="range" name="" id="" min='0' max='255' />
            </div>
            <div>
                <span>Defensa</span><input type="range" name="" id="" min='0' max='255' />
            </div>
        </PokemonActionsContainer>
    )
}

export default PokemonActions;

