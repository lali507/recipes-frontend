import { useId } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";


export type FieldConfig = {

  label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select'|'tel';

  placeholder?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  instructions?:string
  maxLength?: number


}






const FormField = ({label, registration, error,type,placeholder,required,instructions,maxLength}: FieldConfig) => {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    const describedBy = [instructions && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
    return (
        <div>
            <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
            <input id={id} type={type} {...registration}  placeholder={placeholder||""} maxLength={maxLength}
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
