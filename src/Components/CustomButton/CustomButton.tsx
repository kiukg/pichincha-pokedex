import { CustomButtonContainer, CustomButtonContainerNoText } from "./CustomButton.styled";

interface IButton {
    id?: string;
    imgSrc?: string;
    backgroundColor: string;
    color: string;
    text?: string;
    type: 'button' | 'submit';
    onClick?:
    | ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void)
    | undefined;
}

const CustomButton: React.FC<IButton> = ({ id, imgSrc, backgroundColor, text, color, onClick, type }) => {

    return (
        text ?
            (<CustomButtonContainer style={{ backgroundColor: backgroundColor }} onClick={onClick} >
                <div data-testid={id} className="img" id={id?.toString()} onClick={onClick} style={{ paddingLeft: '8px', width: '16px', height: '16px', backgroundColor: color, WebkitMask: `url(${window.location.origin + imgSrc}) no-repeat center / contain` }} />
                <input type={type} value={text} style={{ color }} ></input>
            </CustomButtonContainer>) :
            (<CustomButtonContainerNoText style={{ backgroundColor: backgroundColor }} onClick={onClick} >
                <div className="img" data-testid={id} id={id?.toString()} onClick={onClick} style={{ width: '20px', height: '20px', backgroundColor: color, WebkitMask: `url(${window.location.origin + imgSrc}) no-repeat center / contain` }} />
                {text && <input type={type} value={text} style={{ color }} ></input>}
            </CustomButtonContainerNoText>)
    )
}

export default CustomButton;

