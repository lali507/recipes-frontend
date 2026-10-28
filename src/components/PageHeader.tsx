import type { ReactNode } from "react"

interface PageHeaderProps {
    title: string
    icon?: string
    subtitle?: ReactNode
    actions?: ReactNode
}

const PageHeader = ({ title, icon, subtitle, actions }: PageHeaderProps) => (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between motion-safe:animate-fade-up">
        <div className="flex items-center gap-4">
            {icon && (
                <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 text-3xl shadow-inner">
                    {icon}
                </span>
            )}
            <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
                {subtitle && <p className="mt-1 text-cocoa">{subtitle}</p>}
            </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
)
export default PageHeader
