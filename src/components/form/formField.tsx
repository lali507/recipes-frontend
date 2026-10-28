import { useId } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { errorClass, hintClass, inputClass, labelClass } from "./styles";


export type FieldConfig = {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select' | 'tel';
  placeholder?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  instructions?: string
  maxLength?: number
  hideLabel?: boolean
}

const FormField = ({ label, registration, error, type, placeholder, required, instructions, maxLength, hideLabel }: FieldConfig) => {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    const describedBy = [instructions && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

    if (type === "checkbox")
        return (
            <div>
                <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-4 transition hover:border-brand-200 hover:bg-brand-50 has-[:checked]:border-brand-300 has-[:checked]:bg-brand-50">
                    <input id={id} type="checkbox" {...registration}
                        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-600"
                        aria-invalid={!!error}
                        aria-describedby={describedBy}
                    />
                    <span>
                        <span className="block font-semibold text-ink">{label}</span>
                        {instructions && <span id={hintId} className="mt-0.5 block text-sm text-cocoa">{instructions}</span>}
                    </span>
                </label>
                {error && <p id={errorId} role="alert" className={errorClass}>{error.message}</p>}
            </div>
        )

    return (
        <div>
            <label htmlFor={id} className={hideLabel ? "sr-only" : labelClass}>
                {label}{required && <span aria-hidden="true" className="text-brand-600"> *</span>}
            </label>
            <input id={id} type={type} {...registration} placeholder={placeholder || ""} maxLength={maxLength}
                className={inputClass}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={describedBy}
            />
            {instructions && <p id={hintId} className={hintClass}>{instructions}</p>}
            {error && <p id={errorId} role="alert" className={errorClass}><span aria-hidden="true">⚠</span>{error.message}</p>}
        </div>
    )
}
export default FormField
