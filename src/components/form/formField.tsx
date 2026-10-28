import { useId } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";


export type FieldConfig = {

  label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select'|'tel';

  //options?: { label: string; value: string }[]; // For select, radio, and checkbox types
  placeholder?: string;
  required?: boolean; // מציג כוכבית ליד התווית
  registration: UseFormRegisterReturn;
  error?: FieldError;
  instructions?:string


}






const FormField = ({label, registration, error,type,placeholder,required,instructions}: FieldConfig) => {
    const id = useId(); // מזהה ייחודי - כדי שלא יהיו id כפולים כששני טפסים באותו דף
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    // מחבר את ההוראה והשגיאה ל-input כדי שקורא מסך יקריא אותן
    const describedBy = [instructions && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
    return (
        <div>
            <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
            <input id={id} type={type} {...registration}  placeholder={placeholder||""}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={describedBy}
            />
            {instructions && <p id={hintId}>{instructions}</p>}
            {error && <p id={errorId} role="alert">{error.message}</p>}
        </div>


    )
}
export default FormField
