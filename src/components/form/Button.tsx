type buttonConfig = {
    text: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    onFocus?: () => void;
    

};

export default function MyButton({ text, type="button", disabled, onClick, onHover, onFocus }: buttonConfig ) {
    return (
        <button type={type} onClick={onClick} onMouseEnter={onHover} onFocus={onFocus} disabled={disabled}>
            {text}
        </button>
    );
}