export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
export type ButtonSize = "sm" | "md" | "lg"

const buttonBase = "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-md shadow-brand-600/25 hover:from-brand-600 hover:to-brand-700 hover:shadow-lg hover:shadow-brand-600/30",
    secondary: "bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
    ghost: "text-cocoa hover:bg-brand-50 hover:text-brand-700",
    danger: "bg-white text-red-700 ring-1 ring-red-200 hover:bg-red-50 hover:ring-red-300",
}

const buttonSizes: Record<ButtonSize, string> = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
}

export const buttonClass = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
    `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`

export const inputClass = "block w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-ink shadow-sm transition placeholder:text-cocoa/50 hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 focus:outline-none aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100"

const customSelect = [
    "[appearance:base-select] flex items-center justify-between gap-2",
    "[&::picker-icon]:text-brand-500 [&::picker-icon]:transition-transform [&::picker-icon]:duration-200 open:[&::picker-icon]:rotate-180",
    "open:border-brand-400 open:ring-4 open:ring-brand-100",
    "[&::picker(select)]:[appearance:base-select] [&::picker(select)]:mt-2 [&::picker(select)]:max-h-72 [&::picker(select)]:rounded-2xl [&::picker(select)]:border [&::picker(select)]:border-brand-100 [&::picker(select)]:bg-white [&::picker(select)]:p-1.5 [&::picker(select)]:shadow-xl [&::picker(select)]:shadow-brand-200/50",
    "[&_option]:flex [&_option]:cursor-pointer [&_option]:items-center [&_option]:gap-2 [&_option]:rounded-xl [&_option]:px-3 [&_option]:py-2.5 [&_option]:text-sm [&_option]:text-ink [&_option]:transition-colors",
    "[&_option:hover]:bg-brand-50 [&_option:focus-visible]:bg-brand-50 [&_option:focus-visible]:outline-none [&_option:checked]:bg-brand-100 [&_option:checked]:font-semibold [&_option:checked]:text-brand-800",
    "[&_option::checkmark]:text-brand-600",
].join(" ")

export const selectClass = `${inputClass} cursor-pointer ${customSelect}`

export const labelClass = "mb-1.5 block text-sm font-semibold text-ink"

export const hintClass = "mt-1.5 text-xs text-cocoa"

export const errorClass = "mt-1.5 flex items-center gap-1 text-sm font-medium text-red-600"
