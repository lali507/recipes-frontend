import { buttonClass, type ButtonSize, type ButtonVariant } from "./styles";

type buttonConfig = {
    text: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    onFocus?: () => void;
};

export default function MyButton({ text, type = "button", disabled, variant = "primary", size = "md", fullWidth, onClick, onHover, onFocus }: buttonConfig) {
    return (
        <button type={type} onClick={onClick} onMouseEnter={onHover} onFocus={onFocus} disabled={disabled}
            className={`${buttonClass(variant, size)} ${fullWidth ? "w-full" : ""}`}>
            {text}
        </button>
    );
}
