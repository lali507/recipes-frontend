import type { ReactNode } from "react"

interface AuthCardProps {
    icon: string
    title: string
    subtitle: string
    children: ReactNode
    footer: ReactNode
}

const AuthCard = ({ icon, title, subtitle, children, footer }: AuthCardProps) => (
    <div className="relative isolate mx-auto max-w-md py-4 motion-safe:animate-fade-up">
        <div aria-hidden="true" className="absolute -top-10 -start-16 -z-10 size-56 rounded-full bg-brand-200/50 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-10 -end-16 -z-10 size-56 rounded-full bg-brand-300/30 blur-3xl" />

        <div className="rounded-[2rem] bg-white/90 p-7 shadow-xl shadow-brand-200/40 ring-1 ring-brand-100 backdrop-blur sm:p-10">
            <div className="mb-8 text-center">
                <span aria-hidden="true" className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 text-3xl shadow-inner motion-safe:animate-float">
                    {icon}
                </span>
                <h1 className="font-display text-3xl font-extrabold text-ink">{title}</h1>
                <p className="mt-2 text-cocoa">{subtitle}</p>
            </div>
            {children}
            <div className="mt-6 border-t border-brand-100 pt-6 text-center text-sm text-cocoa">{footer}</div>
        </div>
    </div>
)
export default AuthCard
